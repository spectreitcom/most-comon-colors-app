from abc import ABC

from rest_framework import serializers


class ImageUploadSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    image = serializers.ImageField(required=True)


