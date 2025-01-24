from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoItemViewSet

todo_router = DefaultRouter()
todo_router.register(r'todoitems', TodoItemViewSet, basename='todoitem')