from django.db import models

# Create your models 
    
class TodoItem(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"TodoItem: {self.name}"