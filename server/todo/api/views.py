from rest_framework import status
from rest_framework.response import Response
from ..models import TodoItem
from .serializers import TodoItemSerializer
from rest_framework.viewsets import ModelViewSet

class TodoItemViewSet(ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)