$(document).ready(function () {
    // Create Pelanggan
    $('#createPelangganForm').submit(function (event) {
        event.preventDefault();
        const pelanggan = {
            nama: $('#nama').val(),
            telp: $('#telp').val()
        };
        createPelanggan(pelanggan);
    });

    // Create Order
    $('#createOrderForm').submit(function (event) {
        event.preventDefault();
        const order = {
            jenisPelayanan: $('#jenisPelayanan').val(),
            totalBiaya: $('#totalBiaya').val(),
            tanggal: $('#tanggal').val(),
            pelanggan: {
                id: $('#pelangganId').val()
            }
        };
        createOrder(order);
    });

    // Fetch Pelanggan List
    function fetchPelangganList() {
        $.ajax({
            url: 'http://localhost:8080/laundryapp/pelanggan',
            type: 'GET',
            success: function (response) {
                const tableBody = $('#tablePelanggan tbody');
                tableBody.empty();
                response.forEach(pelanggan => {
                    tableBody.append(`
                        <tr>
                            <td>${pelanggan.id}</td>
                            <td>${pelanggan.nama}</td>
                            <td>${pelanggan.telp}</td>
                            <td class="actions">
                                <button onclick="editPelanggan(${pelanggan.id})">Edit</button>
                                <button onclick="deletePelanggan(${pelanggan.id})">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function (error) {
                console.error('Error fetching pelanggan list:', error);
            }
        });
    }

    // Fetch Order List
    function fetchOrderList() {
        $.ajax({
            url: 'http://localhost:8080/laundryapp/order',
            type: 'GET',
            success: function (response) {
                const tableBody = $('#tableOrder tbody');
                tableBody.empty();
                response.forEach(order => {
                    tableBody.append(`
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.jenisPelayanan}</td>
                            <td>${order.totalBiaya}</td>
                            <td>${order.tanggal}</td>
                            <td>${order.pelanggan.id}</td>
                            <td class="actions">
                                <button onclick="editOrder(${order.id})">Edit</button>
                                <button onclick="deleteOrder(${order.id})">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function (error) {
                console.error('Error fetching order list:', error);
            }
        });
    }

    // Edit Pelanggan
    window.editPelanggan = function (id) {
        $.ajax({
            url: `http://localhost:8080/laundryapp/pelanggan/${id}`,
            type: 'GET',
            success: function (response) {
                $('#editPelangganId').val(response.id);
                $('#editNama').val(response.nama);
                $('#editTelp').val(response.telp);
                $('#listPelanggan').hide();
                $('#editPelanggan').show();
            },
            error: function (error) {
                console.error('Error fetching pelanggan:', error);
            }
        });
    };

    // Update Pelanggan
    $('#editPelangganForm').submit(function (event) {
        event.preventDefault();
        const id = $('#editPelangganId').val();
        const pelanggan = {
            id: id,
            nama: $('#editNama').val(),
            telp: $('#editTelp').val()
        };
        updatePelanggan(id, pelanggan);
    });

    // Delete Pelanggan
    window.deletePelanggan = function (id) {
        if (confirm('Are you sure you want to delete this pelanggan?')) {
            $.ajax({
                url: `http://localhost:8080/laundryapp/pelanggan/${id}`,
                type: 'DELETE',
                success: function (response) {
                    fetchPelangganList();
                },
                error: function (error) {
                    console.error('Error deleting pelanggan:', error);
                }
            });
        }
    };

    // Edit Order
    window.editOrder = function (id) {
        $.ajax({
            url: `http://localhost:8080/laundryapp/order/${id}`,
            type: 'GET',
            success: function (response) {
                $('#editOrderId').val(response.id);
                $('#editJenisPelayanan').val(response.jenisPelayanan);
                $('#editTotalBiaya').val(response.totalBiaya);
                $('#editTanggal').val(response.tanggal);
                $('#editPelangganId').val(response.pelanggan.id);
                $('#listOrder').hide();
                $('#editOrder').show();
            },
            error: function (error) {
                console.error('Error fetching order:', error);
            }
        });
    };

    // Update Order
    $('#editOrderForm').submit(function (event) {
        event.preventDefault();
        const id = $('#editOrderId').val();
        const order = {
            id: id,
            jenisPelayanan: $('#editJenisPelayanan').val(),
            totalBiaya: $('#editTotalBiaya').val(),
            tanggal: $('#editTanggal').val(),
            pelanggan: {
                id: $('#editPelangganId').val()
            }
        };
        updateOrder(id, order);
    });

    // Delete Order
    window.deleteOrder = function (id) {
        if (confirm('Are you sure you want to delete this order?')) {
            $.ajax({
                url: `http://localhost:8080/laundryapp/order/${id}`,
                type: 'DELETE',
                success: function (response) {
                    fetchOrderList();
                },
                error: function (error) {
                    console.error('Error deleting order:', error);
                }
            });
        }
    };

    // Function to create Pelanggan
    function createPelanggan(pelanggan) {
        $.ajax({
            url: 'http://localhost:8080/laundryapp/pelanggan',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(pelanggan),
            success: function (response) {
                $('#result1').text(JSON.stringify(response, null, 2));
            },
            error: function (error) {
                $('#result1').text(JSON.stringify(error, null, 2));
            }
        });
    }

    // Function to create Order
    function createOrder(order) {
        $.ajax({
            url: 'http://localhost:8080/laundryapp/order',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(order),
            success: function (response) {
                $('#result2').text(JSON.stringify(response, null, 2));
            },
            error: function (error) {
                $('#result2').text(JSON.stringify(error, null, 2));
            }
        });
    }

    // Function to update Pelanggan
    function updatePelanggan(id, pelanggan) {
        $.ajax({
            url: `http://localhost:8080/laundryapp/pelanggan/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(pelanggan),
            success: function (response) {
                $('#resultEditPelanggan').text(JSON.stringify(response, null, 2));
                fetchPelangganList();
                defaultPage();
            },
            error: function (error) {
                $('#resultEditPelanggan').text(JSON.stringify(error, null, 2));
            }
        });
    }

    // Function to update Order
    function updateOrder(id, order) {
        $.ajax({
            url: `http://localhost:8080/laundryapp/order/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(order),
            success: function (response) {
                $('#resultEditOrder').text(JSON.stringify(response, null, 2));
                fetchOrderList();
                defaultPage();
            },
            error: function (error) {
                $('#resultEditOrder').text(JSON.stringify(error, null, 2));
            }
        });
    }

});
