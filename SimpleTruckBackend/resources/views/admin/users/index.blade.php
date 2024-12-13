@extends('admin.layouts.app')

@section('content')
<div class="container mt-4">
    <h2 class="text-center mb-4">User  Management</h2>

    <!-- Filterable DataTable -->
    <div class="table-responsive">
        <table id="usersTable" class="table table-bordered table-striped">
            <thead class="bg-dark text-white">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->is_admin ? 'Admin' : 'User ' }}</td>
                    <td>
                        <button class="btn btn-info btn-sm view-btn" 
                                data-name="{{ $user->name }}" 
                                data-email="{{ $user->email }}">
                            View
                        </button>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

<!-- Modal for Viewing User Details and Sending Email -->
<div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="userModalLabel">User  Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p><strong>Name:</strong> <span id="userName"></span></p>
                <p><strong>Email:</strong> <span id="userEmail"></span></p>
                <textarea id="emailContent" class="form-control" rows="4" placeholder="Enter your message"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="sendEmailBtn" class="btn btn-primary">Send Email</button>
            </div>
        </div>
    </div>
</div>

@section('scripts')
<script>
    $(document).ready(function() {
        $('#usersTable').DataTable({
            dom: 'Bfrtip',
            responsive: true,
        });
        
        // Show modal and populate user details
        $('.view-btn').on('click', function() {
            const userName = $(this).data('name');
            const userEmail = $(this).data('email');
            $('#userName').text(userName);
            $('#userEmail').text(userEmail);
            $('#userModal').modal('show');
        });

        // Send email on button click
        $('#sendEmailBtn').on('click', function() {
            const emailContent = $('#emailContent').val();
            const userEmail = $('#userEmail').text();

            if (emailContent.trim() === '') {
                alert('Please enter a message before sending.');
                return;
            }

            $.ajax({
                url: '{{ route("admin.send-email") }}', // Update with your route
                type: 'POST',
                data: {
                    email: userEmail,
                    content: emailContent,
                    _token: '{{ csrf_token() }}' // CSRF token for security
                },
                success: function(response) {
                    alert('Email sent successfully!');
                    $('#userModal').modal('hide');
                    $('#emailContent').val(''); // Clear the textarea
                },
                error: function(xhr) {
                    alert('An error occurred while sending the email.');
                }
            });
        });
    });
</script>
@endsection
@endsection