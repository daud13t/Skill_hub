from django.urls import path
from .views import AvailabilityView,BookingListCreateView,BookingApproveView

urlpatterns = [
    path('', BookingListCreateView.as_view(), name='booking-list-create'),
    path('availability/', AvailabilityView.as_view(), name='availability-detail'),
    path('<int:pk>/approve/', BookingApproveView.as_view(), name='booking-approve'),
]