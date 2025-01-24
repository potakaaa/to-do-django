
from rest_framework.serializers import ModelSerializer
from ..models import TodoList, TodoItem

class TodoItemSerializer(ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ['id', 'name', 'completed']

class TodoListSerializer(ModelSerializer):
    items = TodoItemSerializer(many=True, read_only=True)

    class Meta:
        model = TodoList
        fields = ['id', 'title', 'created', 'items']