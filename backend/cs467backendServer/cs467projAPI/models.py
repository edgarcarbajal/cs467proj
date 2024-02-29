from django.db import models

# Create your models here. Models reflect the records you might get back from a database query!

class TestModelAPI(models.Model):
    title = models.CharField(max_length=200)  #<--- These are always classes! Always create an obj instance, or else API will fail!
    description = models.TextField()

    #method to convert class obj instances into strings (for error purpouses?)
    def __str__(self):
        return self.title