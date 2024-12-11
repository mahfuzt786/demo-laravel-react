<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewOrderNotification extends Notification
{
    use Queueable;

    private $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function via($notifiable)
    {
        // return ['mail'];
        return ['database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('New Truck Order')
                    ->line('A new truck order has been placed.')
                    ->action('View Order', url('/orders/'.$this->order->id));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    // public function toArray(object $notifiable): array
    // {
    //     return [
    //         //
    //     ];
    // }

    public function toArray($notifiable)
    {
        return [
            'message' => 'A new order has been placed.',
        ];
    }
}

