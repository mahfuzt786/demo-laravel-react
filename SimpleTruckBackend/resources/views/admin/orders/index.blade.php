@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>Orders</h1>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>User</th>
                <th>Size</th>
                <th>Weight</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>{{ $order->id }}</td>
                <td>{{ $order->user->name }}</td>
                <td>{{ $order->size }}</td>
                <td>{{ $order->weight }}</td>
                <td>{{ ucfirst($order->status) }}</td>
                <td>
                    <form method="POST" action="{{ route('admin.order.update', $order->id) }}">
                        @csrf
                        <select name="status" required>
                            <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Pending</option>
                            <option value="approved" {{ $order->status == 'approved' ? 'selected' : '' }}>Approved</option>
                            <option value="rejected" {{ $order->status == 'rejected' ? 'selected' : '' }}>Rejected</option>
                            <option value="completed" {{ $order->status == 'completed' ? 'selected' : '' }}>Completed</option>
                        </select>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    {{ $orders->links() }}
</div>
@endsection
