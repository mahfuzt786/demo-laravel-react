<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

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
        // Adjust as needed: mail, database, etc.
        return ['mail', 'database'];
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
    
    public function toArray($notifiable)
    {
        return [
            'message' => 'A new order has been placed.',
            'order_id' => $this->order->id,
            'size' => $this->order->size,
            'weight' => $this->order->weight,
            'location' => $this->order->location,
            'pickup_time' => $this->order->pickup_time,
            'delivery_time' => $this->order->delivery_time,
        ];
    }
}

