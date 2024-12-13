@extends('admin.layouts.app')

@section('content')
<div class="container py-4">
    <h2 class="text-primary">Orders Management</h2>

    <!-- Filter Section -->
    <div class="mb-4">
        <label for="filterStatus" class="form-label">Filter by Status</label>
        <select id="filterStatus" class="form-select">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
        </select>
    </div>

    <!-- Orders Table -->
    <table id="ordersTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>User</th>
                <th>Size</th>
                <th>Weight</th>
                <th>Pickup Time</th>
                <th>Delivery Time</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr data-status="{{ $order->status }}">
                <td>{{ $order->id }}</td>
                <td>{{ $order->user->name }}</td>
                <td>{{ $order->size }}</td>
                <td>{{ $order->weight }}</td>
                <td>{{ $order->pickup_time }}</td>
                <td>{{ $order->delivery_time }}</td>
                <td class="text-capitalize">{{ $order->status }}</td>
                <td>
                    <button class="btn btn-sm btn-primary updateStatusBtn" data-id="{{ $order->id }}" 
                            data-email="{{ $order->user->email }}" 
                            data-name="{{ $order->user->name }}" 
                            data-current-status="{{ $order->status }}">
                        Update Status and Email User
                    </button>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

<!-- Update Status Modal -->
<div class="modal fade" id="updateStatusModal" tabindex="-1" aria-labelledby="updateStatusModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateStatusModalLabel">Update and Email Order Status</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="updateStatusForm">
                    @csrf
                    <input type="hidden" id="orderId" name="order_id">
                    <div class="mb-3">
                        <label for="status" class="form-label">Select Status</label>
                        <select id="status" name="status" class="form-select">
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="emailContent" class="form-label">Email Notification</label>
                        <textarea id="emailContent" name="email_content" class="form-control" rows="3" placeholder="Enter email content"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="saveStatusBtn">Save and Email</button>
            </div>
        </div>
    </div>
</div>

<div id="statusLoader" class="text-center" style="position: absolute; top: 100px; z-index: 999; height: 100%; width: 100%; background: #fff; display:none;">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <p>Processing...</p>
</div>
@endsection

@section('scripts')
<script>
    $(document).ready(function () {
        // Initialize DataTable
        var table = $('#ordersTable').DataTable({
            responsive: true
        });

        // Filter by Status
        $('#filterStatus').on('change', function () {
            var filter = $(this).val().toLowerCase();
            table.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var row = this.node();
                var status = $(row).data('status').toLowerCase();
                if (filter === '' || status === filter) {
                    $(row).show();
                } else {
                    $(row).hide();
                }
            });
        });

        // Open Modal to Update Status
        $('.updateStatusBtn').on('click', function () {
            var orderId = $(this).data('id');
            var email = $(this).data('email');
            var name = $(this).data('name');
            var currentStatus = $(this).data('current-status');

            $('#orderId').val(orderId);
            $('#status').val(currentStatus);
            $('#emailContent').val('Hello ' + name + ',\n\nYour order status has been updated to ' + currentStatus + '.\n\nThank you.');
            $('#updateStatusModal').modal('show');
        });

        // Save Status and Send Email
        $('#saveStatusBtn').on('click', function () {
            $('#statusLoader').show();
            $('#updateStatusModal').modal('hide');

            var orderId = $('#orderId').val();
            var formData = $('#updateStatusForm').serialize();
            $.ajax({
                url: '{{ url("admin/orders") }}/' + orderId + '/status', // Dynamically insert the order ID
                method: 'POST',
                data: formData,
                success: function (response) {
                    console.log(response);
                    location.reload();
                },
                error: function (xhr) {
                    alert('An error occurred: ' + xhr.responseText);
                }
            });
        });
    });
</script>
@endsection
