from django.urls import path
from .views import *

urlpatterns = [
    # Моменты
    path('api/moments/', search_moments),  # GET
    path('api/moments/<int:moment_id>/', get_moment),  # GET
    path('api/moments/create/', create_moment),  # POST
    path('api/moments/<int:moment_id>/add_comment/', create_comment),  # POST
    path('api/moments/<int:moment_id>/comments/', get_moment_comments),  # GET
    path('api/moments/<int:moment_id>/like/', like_moment),  # POST

    # Коменты
    path('api/comments/<int:comment_id>/like/', like_comment),  # POST

    # Пользователи
    path('api/users/<int:user_id>/', get_user),  # GET
    path('api/users/<int:user_id>/subscribers/', get_subscribers),  # GET
    path('api/users/<int:user_id>/suggested_users/', get_suggested_users),  # GET
    path('api/users/<int:user_id>/subscribe/', subscribe),  # POST
    path('api/users/<int:user_id>/update/', update_user),  # PUT

    # Авторизация и аутентификация
    path("api/register/", register),
    path("api/login/", login),
    path("api/check/", check),
    path("api/logout/", logout),
]
