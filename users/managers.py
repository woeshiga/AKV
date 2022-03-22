from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, username: str, password: str, first_name: str = None, last_name: str = None,
                    tg_username: str = None,
                    inviter: str = None, commit: bool = True):
        if not username:
            raise ValueError('Email является обязательным полем')
        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            telegram=tg_username,
            inviter=inviter
        )
        user.set_password(password)
        if commit:
            user.save(using=self._db)
        return user

    def create_superuser(self, username: str, password: str):
        user = self.create_user(username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
