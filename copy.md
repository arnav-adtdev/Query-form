extends layout

block content
  .d-flex.justify-content-center.align-items-center.min-vh-75
    .container
      h1.text-center.mb-4 WELCOME TO DASHBOARD
      //- a(href="/dashboard/Tracking") View Device Locations
      // Location Status
      .form-group.mt-4
        p#locationStatus.mt-2
        button.btn.btn-primary(type="button", id="changeLocationBtn") Change Location

      // Form
      form(action="/submit" method="post" id="requestForm")
        // Required Label with Cascading Dropdown
        .form-group
          label(for="requiredDropdown") Required
          select#requiredDropdown.form-control(name="requiredOption")
            option(value="") Select an option
            option(value="Bike Oil Anywhere Deliver") Bike Oil Anywhere Deliver
            option(value="Professional Cleaning") Professional Cleaning
            option(value="Professional Bathroom Cleaning") Professional Bathroom Cleaning
            option(value="Bathroom Subscription Service") Bathroom Subscription Service
            option(value="Geyser Repair") Geyser Repair
            option(value="Carpenter's") Carpenter's
            option(value="Electricians") Electricians
            option(value="Washing Machine Repair") Washing Machine Repair
            option(value="Plumber") Plumber
            option(value="Men's Salon & Spa") Men's Salon & Spa
            option(value="Women's Salon & Spa") Women's Salon & Spa
            option(value="Rooms/Walls Painting") Rooms/Walls Painting
            option(value="Salon") Salon
            option(value="Want To Hire Someone For Something") Want To Hire Someone For Something

        // Description Label with Text Input
        .form-group
          label(for="description") Description
          textarea#description.form-control.form-control-lg(name="description" row="3" placeholder="What's your request can you please tell here ",required style="height:8rem; width: 100%; resize: none;")

        // Location Input (Hidden)
        input#location(type="hidden" name="location")

        // Manually Change Location Input (Initially Hidden)
        .form-group.mt-3#manualLocationGroup(style="display: none;")
          label(for="manualLocation") Enter New Location
          input#manualLocation.form-control(type="text", name="manualLocation", placeholder="Type here accurate location ")
          button.btn.btn-secondary.mt-2(type="button", id="saveLocationBtn") Save Location

        // Buttons
        .form-group.d-flex.justify-content-between.mt-3
          button.btn.btn-light(type="submit") Normal
          button.btn.btn-success(type="submit") Urgent
          button.btn.btn-danger(type="submit") Emergency

 