from django.shortcuts import render
from django.http import HttpResponse
from rembg import remove
from .forms import ImageUploadForm
from PIL import Image
from .models import ImageUp
from io import BytesIO
from django.core.files import File
from pathlib import Path
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    form = ImageUploadForm()
    context = {'form':form}
    output = None
    if request.method == 'POST':
        form =ImageUploadForm(request.POST,request.FILES)
        if form.is_valid():
            input_path = form.cleaned_data['img']

            a = str(input_path)
            ext = a.split('.')[-1]
            fname = a.replace('.'+ext,'')
            output_path = f'media/{fname}_output.{ext}'
            op = f'{fname}_output.{ext}'
            input_img = Image.open(input_path)
            output_img = remove(input_img)
            output_img.convert('RGB')
            output = output_img.save(output_path,'PNG')

            im = ImageUp()
            path = Path(output_path)
            with path.open(mode="rb") as f:
                im.img = File(f,name = op)
                im.save()

            context.update({'output':im})
    return render(request,'core/index.html',context)
