import firebase_admin 
from firebase_admin import credentials,auth

cred = credentials.Certificate("../backend/firebase-adminsdk.json")
firebase_admin.initialize_app(cred)





def Firebase_validation(id_token):
   """
   This function receives id token sent by Firebase and
   validate the id token then check if the user exist on
   Firebase or not if exist it returns True else False
   """
   try:
       decoded_token = auth.verify_id_token(id_token)
       uid = decoded_token['uid']
       provider = decoded_token['firebase']['sign_in_provider']
       image = None
       name = None
       if "name" in decoded_token:
           name = decoded_token['name']
       if "picture" in decoded_token:
           image = decoded_token['picture']
       try:
           user = auth.get_user(uid)
           email = user.email
           if user:
               return {
                   "status": True,
                   "uid": uid,
                   "email": email,
                   "name": name,
                   "provider": provider,
                   "image": image
               }
           else:
               return False
       except UserNotFoundError:
           print("user not exist")
   except ExpiredIdTokenError:
       print("invalid token")