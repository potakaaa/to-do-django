from rest_framework.viewsets import ModelViewSet
from ..models import TodoItem, TodoList
from .serializers import TodoItemSerializer, TodoListSerializer

class TodoListViewSet(ModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer

class TodoItemViewSet(ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer