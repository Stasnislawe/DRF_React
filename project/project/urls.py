"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from api_app.views import BookSerializerView
from drf_yasg.views import get_schema_view
from rest_framework_simplejwt import views as jwt_views
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(  # new
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Swagger description",
    ),
    # url=f'{settings.APP_URL}/api/v3/',
    patterns=[path('', include('api_app.urls')), ],
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('swagger-ui/', TemplateView.as_view(
            template_name='swaggerui/swaggerui.html',
            extra_context={'schema_url': 'openapi-schema'}
        ),
        name='swagger-ui'),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('', include('api_app.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
