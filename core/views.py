from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from core.serializers import ImageUploadSerializer
import numpy as np
from PIL import Image


def rgb_to_hex(r, g, b):
  return ('{:X}{:X}{:X}').format(r, g, b)


@require_http_methods(['GET'])
def index_view(request):
    return render(request, 'core.html')


@api_view(["POST"])
def upload(request: Request):
    serializer = ImageUploadSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    image = request.FILES.get('image')
    colors_counter = {}
    with Image.open(image) as im:
        image_array = np.asarray(im)
        for row in image_array:
            for pixel in row:
                r = pixel[0]
                g = pixel[1]
                b = pixel[2]
                key = f"{r},{g},{b}"
                if colors_counter.get(key):
                    colors_counter[key]["counter"] += 1
                else:
                    colors_counter[key] = {
                        "counter": 1,
                        "r": r,
                        "g": g,
                        "b": b
                    }

    colors_array = [{
        "rgb": color_key,
        "count": colors_counter.get(color_key).get("counter"),
        "bg_css_value": f"rgb({color_key})",
        "hex": rgb_to_hex(colors_counter.get(color_key).get("r"), colors_counter.get(color_key).get("g"), colors_counter.get(color_key).get("b"))
    } for color_key in colors_counter.keys()]

    colors_array.sort(key=lambda x: x.get("count"), reverse=True)

    return Response({"colors": colors_array[:500]})

