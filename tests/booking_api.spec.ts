import { test, expect } from '@playwright/test';


test('Ping - HealthCheck @ping', async({request})=>{
  const response = await request.get('https://restful-booker.herokuapp.com/ping');

  expect(response.status()).toBe(201);
  expect(response.statusText()).toBe('Created');

  
});


test.describe('booker API', ()=>{

  test('Auth - CreateToken', async({request})=>{
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      headers: {'Content-Type': 'application/json'},
      data: { "username" : "admin", "password" : "password123"}
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

   const data = await response.json();

   expect(data).toHaveProperty('token');

  });

  test('Booking - GetBookingIds', async({request})=>{
    const response = await request.get('https://restful-booker.herokuapp.com/booking');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

   const data = await response.json();
   console.log(data);

   for( let elem of data){
    expect(elem).toHaveProperty('bookingid');
   }

  });
  
  test('Booking - GetBookingIds Filter by checkin/checkout date', async({request})=>{

    const checkin = '2014-03-13';
    const checkout = '2014-05-21';
    const response = await request.get(`https://restful-booker.herokuapp.com/booking?checkin=${checkin}&checkout=${checkout}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data);
    for(let elem of data){
      expect(elem).toHaveProperty('bookingid');
    }
    
  });

  test('Booking - GetBookingIds Filter by name', async({request})=>{
    const firstname = 'sally';
    const lastname = 'brown';
    const response = await request.get(`https://restful-booker.herokuapp.com/booking?firstname=${firstname }&lastname=${lastname}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data);

    for(let elem of data){
      expect(elem).toHaveProperty('bookingid');
    }

  });

  
  test('Booking - GetBooking', async({request})=>{

    const id = 1;
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${id}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
   

    expect(data).toHaveProperty('firstname');
    expect(data).toHaveProperty('lastname');
    expect(data).toHaveProperty('totalprice');
    expect(data).toHaveProperty('depositpaid');
  
    expect(data.bookingdates).toHaveProperty('checkin');
    expect(data.bookingdates).toHaveProperty('checkout');
    expect(data).toHaveProperty('additionalneeds');
  });
 test('Booking - CreateBooking', async({request})=>{
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: {'Content-Type' : 'application/json'},
    data: { 
     "firstname" : "Jim",
     "lastname" : "Brown",
     "totalprice" : 111,
     "depositpaid" : true,
     "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
     },
     "additionalneeds" : "Breakfast"}
  });
   
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data).toHaveProperty('bookingid');
  expect(data).toHaveProperty('booking');
  expect(data.booking).toHaveProperty('firstname', 'Jim');
  expect(data.booking).toHaveProperty('lastname', 'Brown');
  expect(data.booking).toHaveProperty('totalprice', 111);
  expect(data.booking).toHaveProperty('depositpaid',  true);
  expect(data.booking).toHaveProperty('bookingdates');
  expect(data.booking.bookingdates).toHaveProperty('checkin', '2018-01-01');
  expect(data.booking.bookingdates).toHaveProperty('checkout', '2019-01-01');
  expect(data.booking).toHaveProperty('additionalneeds', 'Breakfast');
      
 });

});


test.describe('With Auth Test: @auth', ()=>{

  let token : string;

  test.beforeEach(async({request})=>{
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      headers: {'Content-Type': 'application/json'},
      data: { "username" : "admin", "password" : "password123"}
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

   const data = await response.json();

   expect(data).toHaveProperty('token');
   
   token = data.token;
  });
  test('Booking - UpdateBooking', async({request})=>{
     const updateData = {
       "firstname" : "James",
       "lastname" : "Brown",
       "totalprice" : 111,
       "depositpaid" : true,
       "bookingdates" : {
          "checkin" : "2018-01-01",
          "checkout" : "2019-01-01"
      },
       "additionalneeds" : "Breakfast"
      };

       const id = 1;

       const response = await request.put(`https://restful-booker.herokuapp.com/booking/${id}`, {
       headers: {'Content-Type': 'application/json', 'Accept' : 'application/json', 'Cookie': `token=${token}`},
       data:  updateData 
      });

     expect(response.ok()).toBeTruthy();
     expect(response.status()).toBe(200);

     const data = await response.json();

     expect(data).toHaveProperty('firstname', updateData.firstname);
     expect(data).toHaveProperty('lastname', updateData.lastname);
     expect(data).toHaveProperty('totalprice', updateData.totalprice);
     expect(data).toHaveProperty('depositpaid', updateData.depositpaid);

     expect(data).toHaveProperty('bookingdates');
     expect(data.bookingdates).toHaveProperty('checkin', updateData.bookingdates.checkin);
     expect(data.bookingdates).toHaveProperty('checkout', updateData.bookingdates.checkout);

     expect(data).toHaveProperty('additionalneeds', updateData.additionalneeds);
 });

test('Booking - PartialUpdateBooking', async({request})=>{
  const updateData = {
     "firstname" : "James",
     "lastname" : "Brown"
  }; 
  const id = 1;
  const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${id}`,{
    headers: {'Content-Type': 'application/json' , 'Accept' : 'application/json' ,'Cookie': `token=${token}`},
    data: updateData
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data).toHaveProperty('firstname',updateData.firstname);
  expect(data).toHaveProperty('lastname', updateData.lastname);

  expect(data).toHaveProperty('totalprice', data.totalprice);
  expect(data).toHaveProperty('depositpaid', data.depositpaid);

  expect(data).toHaveProperty('bookingdates',data.bookingdates);
  expect(data.bookingdates).toHaveProperty('checkin', data.bookingdates.checkin);
  expect(data.bookingdates).toHaveProperty('checkout', data.bookingdates.checkout);
  expect(data).toHaveProperty('additionalneeds', data.additionalneeds);

});

test('Booking - DeleteBooking', async({request})=>{

  //---------------Creat New Book----------------
  const create_response = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: {'Content-Type' : 'application/json'},
    data: { 
     "firstname" : "Jim",
     "lastname" : "Brown",
     "totalprice" : 111,
     "depositpaid" : true,
     "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
     },
     "additionalneeds" : "Breakfast"}
  });
   
  expect(create_response.ok()).toBeTruthy();
  expect(create_response.status()).toBe(200);

  const create_data = await create_response.json();

  expect(create_data).toHaveProperty('bookingid');


  //-----------------------Delete Our Created book-----------
  const id = create_data.bookingid;
  const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${id}`,{
    headers:{'Content-Type': 'application/json', 'Cookie': `token=${token}`}
  });
   
  expect(response.status()).toBe(201);
  expect(response.statusText()).toBe('Created');
  
 
});

});