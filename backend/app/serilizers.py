from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    subscribed = serializers.SerializerMethodField("is_subscribed")

    def is_subscribed(self, user):
        if "subscriber" not in self.context:
            return False

        subscriber = self.context.get("subscriber")
        return Subscribe.objects.filter(subscriber=subscriber, author=user).exists()

    def get_photo(self, user):
        return user.photo.url.replace("minio", "localhost", 1)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'date_register', 'rating', 'subscribers_count', 'photo', 'subscribed')


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password', 'username')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class LikeMomentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeMoment
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, many=False)
    likes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField("is_liked")

    def is_liked(self, comment):
        if "user" not in self.context:
            return False

        user = self.context.get("user")
        return LikeComment.objects.filter(comment=comment, user=user).exists()

    def get_likes(self, comment):
        likes = LikeComment.objects.filter(comment=comment)
        return likes.count()

    class Meta:
        model = Comment
        fields = "__all__"


class MomentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, many=False)
    tags = TagSerializer(read_only=True, many=True)
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField("is_liked")
    image_type = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    def get_image_type(self, moment):
        ratio = moment.image_height / moment.image_width
        if ratio < 0.6:
            return "h-stretch"

        if ratio < 1:
            return "big-stretch"

        return "v-stretch"

    def get_image(self, moment):
        return moment.image.url.replace("minio", "localhost", 1)

    def is_liked(self, moment):
        if "user" not in self.context:
            return False

        user = self.context.get("user")
        return LikeMoment.objects.filter(moment=moment, user=user).exists()

    def get_likes(self, moment):
        likes = LikeMoment.objects.filter(moment=moment)
        return likes.count()

    def get_comments(self, moment):
        comments = Comment.objects.filter(moment=moment)
        return comments.count()

    class Meta:
        model = Moment
        fields = "__all__"
