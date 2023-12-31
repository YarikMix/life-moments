from django.core.cache import cache
from rest_framework.permissions import BasePermission

from .jwt_helper import get_jwt_payload, get_access_token
from .models import CustomUser


class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        token = get_access_token(request)

        if token is None:
            return False

        if token in cache:
            return None

        try:
            payload = get_jwt_payload(token)
        except Exception as e:
            return False

        try:
            user = CustomUser.objects.get(pk=payload["user_id"])
        except Exception as e:
            return False

        return user.is_active

