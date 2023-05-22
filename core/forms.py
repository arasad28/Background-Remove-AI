from django import forms
from .models import *

class ImageUploadForm(forms.Form):
    img = forms.ImageField()

# class ImageUploadForm(forms.ModelForm):
#     class Meta:
#         model = ImageUp
#         fields = ('img',)