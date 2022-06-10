from rest_framework.generics import GenericAPIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response

from backend.accounts.firebase import Firebase_validation
# Create your views here.

User = get_user_model()

class AuthAPIView(GenericAPIView):
    """
    api for creating user from social logins
    """
    def post(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if auth_header:
            id_token = auth_header.split(" ").pop()

            validate = Firebase_validation(id_token)

            if validate:
                user = User.objects.filter(uid = validate["uid"]).first()

                if user:
                   
                    data = {
                       "id": user.id,
                       "email": user.email,
                       "name": user.name,
                       "image": user.image,
                       "type": "existing_user",
                       "provider": validate['provider']
                   }

                    return Response({"data": data,"message": "Login Successful" })

                else:

                    user = User(email = validate['email'],
                                     name = validate['name'],

                                     uid = validate['uid'],

                                     image = validate['image']

                                     )

                    user.save()

                    data = {
                       "id": user.id,
                       "email": user.email,
                       "name": user.name,
                       "image": user.image,
                       "type": "new_user",
                       "provider": validate['provider']
                   }

                    return Response({"data": data,

                                    "message": "User Created Successfully" })

        else:
               return Response({"message": "invalid token"})