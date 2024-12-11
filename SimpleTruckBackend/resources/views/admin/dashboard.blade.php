@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>Admin Dashboard</h1>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h3>{{ $ordersCount }}</h3>
                    <p>Total Orders</p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h3>{{ $usersCount }}</h3>
                    <p>Total Users</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
