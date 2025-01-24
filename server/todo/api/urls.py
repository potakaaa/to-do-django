from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoItemViewSet, TodoListViewSet

todo_router = DefaultRouter()
todo_router.register(r'todolist', TodoListViewSet, basename='todolist')
todo_router.register(r'todoitems', TodoItemViewSet, basename='todoitem')