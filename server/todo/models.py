from django.db import models

# Create your models here.
class TodoList(models.Model):
    title = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Todo: {self.title}"
    
class TodoItem(models.Model):
    todo_list = models.ForeignKey(TodoList, related_name='items', on_delete=models.CASCADE)
    name = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"TodoItem: {self.name}"