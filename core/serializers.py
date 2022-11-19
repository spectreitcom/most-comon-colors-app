from abc import ABC

from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class ImageUploadSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    image = serializers.ImageField(required=True)

    def validate(self, data):
        image = data.get('image')
        size = image.size / 1024
        if size > 300:
            raise ValidationError("Max file size is 300kb")
        return data


