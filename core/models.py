from django.db import models

class ImageUp(models.Model):
    img = models.ImageField(upload_to='products/')
