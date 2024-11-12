import os
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rembg import remove
from .forms import ImageUploadForm
from PIL import Image
from .models import ImageUp
from io import BytesIO
from django.core.files import File
from pathlib import Path
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile


@csrf_exempt
def index(request):
    return render(request,'core/index.html')



@csrf_exempt
def picUpdate(request):
    if request.method == 'POST':
        input_path = request.FILES['img']
        fname,ext = os.path.splitext(str(input_path))
        print(fname)
        print(ext)
        name = f'{fname}_output.png'
        input_img = Image.open(input_path)
        output_img = remove(input_img)
        output_img.convert('RGB')
        print(output_img)
        buffer = BytesIO()
        output_img.save(buffer,format='png')
        buffer.seek(0)
        im = ImageUp()
        im.img.save(name, ContentFile(buffer.read()),save=True)
        ot = im.img.url
    return JsonResponse({'im':ot })


