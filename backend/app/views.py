from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .jwt_helper import create_access_token, get_access_token, get_jwt_payload
from .permissions import IsAuthenticated
from .serilizers import *
from .utils import identity_user


@api_view(["GET"])
def search_moments(request):
    offset = int(request.GET.get("offset", 1))
    limit = int(request.GET.get("limit", 3))
    query = request.GET.get("query", "").lower()
    user_id = int(request.GET.get("user", -1))

    moments = Moment.objects.all()

    if user_id > 0:
        moments = moments.filter(author_id=user_id)

    if query != "":
        filtered = []
        for moment in moments.all():
            for tag in moment.tags.all():
                if query in tag.name:
                    filtered.append(moment)
    else:
        filtered = moments

    serializer = MomentSerializer(
        filtered[offset:offset + limit],
        many=True,
        context={
            'user': identity_user(request)
        }
    )

    data = {
        "data": serializer.data,
        "isLastPage": offset + limit >= len(moments)
    }

    return Response(data)


@api_view(["GET"])
def get_moment(request, moment_id):
    moment = Moment.objects.get(pk=moment_id)
    serializer = MomentSerializer(
        moment,
        many=False,
        context={
            'user': identity_user(request)
        }
    )

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_moment(request):
    access_token = get_access_token(request)
    payload = get_jwt_payload(access_token)
    user_id = payload["user_id"]

    title = request.POST.get("title", "")
    content = request.POST.get("content", "")

    raw_tags = request.POST.get("tags", "")
    tags = raw_tags.split(", ") if raw_tags else []

    moment = Moment.objects.create(
        title=title,
        content=content,
        author=CustomUser.objects.get(pk=user_id),
        date_created=timezone.now()
    )

    if len(tags) > 0:
        for tag in tags:
            if Tag.objects.filter(name=tag).exists():
                moment.tags.add(Tag.objects.filter(name=tag).first())
            else:
                moment.tags.add(Tag.objects.create(name=tag))

    serializer = MomentSerializer(moment, data=request.data, many=False, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_moment_comments(request, moment_id):
    limit = int(request.GET.get("limit", -1))

    comments = Comment.objects.filter(moment_id=moment_id)

    if limit > 0:
        comments = comments[:limit]

    serializer = CommentSerializer(
        comments,
        many=True,
        context={
            'user': identity_user(request)
        }
    )

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_comment(request, moment_id):
    content = request.POST.get("content", "")
    author = identity_user(request)
    moment = Moment.objects.get(pk=moment_id)

    comment = Comment.objects.create(
        content=content,
        author=author,
        moment=moment,
        date_created=timezone.now()
    )

    serializer = CommentSerializer(comment, many=False, partial=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_moment(request, moment_id):
    user = identity_user(request)
    moment = Moment.objects.get(pk=moment_id)

    if LikeMoment.objects.filter(user=user, moment=moment).exists():
        like = LikeMoment.objects.get(user=user, moment=moment)
        like.delete()
        likesCount = LikeMoment.objects.filter(moment=moment).count()
        return Response(likesCount, status=status.HTTP_200_OK)

    LikeMoment.objects.create(
        user=user,
        moment=moment,
        date_created=timezone.now()
    )

    likesCount = LikeMoment.objects.filter(moment=moment).count()

    return Response(likesCount, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_comment(request, comment_id):
    user = identity_user(request)
    comment = Comment.objects.get(pk=comment_id)

    if LikeComment.objects.filter(user=user, comment=comment).exists():
        like = LikeComment.objects.get(user=user, comment=comment)
        like.delete()
        likesCount = LikeComment.objects.filter(comment=comment).count()
        return Response(likesCount, status=status.HTTP_200_OK)

    LikeComment.objects.create(
        user=user,
        comment=comment,
        date_created=timezone.now()
    )

    likesCount = LikeComment.objects.filter(comment=comment).count()

    return Response(likesCount, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_user(request, user_id):
    user = CustomUser.objects.get(pk=user_id)
    serializer = UserSerializer(
        user,
        many=False,
        context={
            "subscriber": identity_user(request)
        }
    )

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_subscribers(request, user_id):
    offset = int(request.GET.get("offset", 0))
    limit = int(request.GET.get("limit", 5))

    subscribes = Subscribe.objects.filter(author_id=user_id)

    subscribers = [subscribe.subscriber for subscribe in subscribes]

    serializer = UserSerializer(subscribers[offset:offset+limit], many=True)

    data = {
        "data": serializer.data,
        "isLastPage": offset + limit >= len(subscribers)
    }

    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_suggested_users(request, user_id):
    subscriber = CustomUser.objects.get(pk=user_id)

    suggested_users = []

    for user in CustomUser.objects.filter(is_superuser=False).exclude(id=user_id):
        if not Subscribe.objects.filter(author=user, subscriber=subscriber).exists():
            suggested_users.append(user)

    serializer = UserSerializer(suggested_users[:3], many=True)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def subscribe(request, user_id):
    subscriber = identity_user(request)
    author = CustomUser.objects.get(pk=user_id)

    if user_id == subscriber.pk:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    if Subscribe.objects.filter(author=author, subscriber=subscriber).exists():
        Subscribe.objects.get(author=author, subscriber=subscriber).delete()
        return Response(status=status.HTTP_200_OK)

    Subscribe.objects.create(
        author=CustomUser.objects.get(pk=user_id),
        subscriber=subscriber,
        date_subscribe=timezone.now()
    )

    return Response(status=status.HTTP_201_CREATED)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    user = CustomUser.objects.get(pk=user_id)

    serializer = UserSerializer(user, data=request.data, many=False, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def login(request):
    serializer = UserLoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(**serializer.data)
    if user is None:
        message = {"message": "invalid credentials"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    access_token = create_access_token(user.id)

    serializer = UserSerializer(
        user,
        many=False,
        context={
            "access_token": access_token
        }
    )

    response = Response(serializer.data, status=status.HTTP_200_OK)

    response.set_cookie('access_token', access_token, httponly=False, expires=settings.JWT["ACCESS_TOKEN_LIFETIME"])

    return response


@api_view(["POST"])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(status=status.HTTP_409_CONFLICT)

    user = serializer.save()

    access_token = create_access_token(user.id)

    message = {
        'message': 'User registered successfully',
        'user_id': user.id,
        "access_token": access_token
    }

    response = Response(message, status=status.HTTP_201_CREATED)

    response.set_cookie('access_token', access_token, httponly=False, expires=settings.JWT["ACCESS_TOKEN_LIFETIME"])

    return response


@api_view(["POST"])
def check(request):
    token = get_access_token(request)

    if token is None:
        message = {"message": "Token is not found"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    payload = get_jwt_payload(token)
    user_id = payload["user_id"]

    user = CustomUser.objects.get(pk=user_id)
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    access_token = get_access_token(request)

    if access_token is None:
        return Response(status=status.HTTP_403_FORBIDDEN)

    message = {"message": "Logged out successfully!"}
    response = Response(message, status=status.HTTP_200_OK)

    response.delete_cookie('access_token')

    return response