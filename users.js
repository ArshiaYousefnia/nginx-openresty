import {axiosAgent, CreateNavSide, NotificationModal, NotifyErrors, persianMonthPeriodToGregorian} from "./utils.js";
import './axios.min.js';

let overlay_counter = 0

let profile_html_body =  `
              <form role="form">
                <div class="card-body" id="profile-card-body">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="first_name-input">نام</label>
                        <input type="text" class="form-control" id="first_name-input" placeholder="- - - -">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="last_name-input">نام خانوادگی</label>
                        <input type="text" class="form-control" id="last_name-input" placeholder="- - - -">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <div class="form-group">
                        <label for="national_ID-input">کد ملی</label>
                        <input type="text" class="form-control number-only" id="national_ID-input" placeholder="- - - -">
                      </div>
                    </div>
                    <div class="col-7">
                      <div class="form-group">
                        <label for="email-input">ایمیل</label>
                        <input type="email" class="form-control number-only" id="email-input" placeholder="- - - -">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="mobile_phone_number-input">شماره همراه</label>
                        <input type="text" class="form-control number-only" id="mobile_phone_number-input" placeholder="- - - -">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="landline_phone_number-input">شماره ثابت</label>
                        <input type="text" class="form-control number-only" id="landline_phone_number-input" placeholder="- - - -">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="address-input">آدرس</label>
                    <input type="email" class="form-control" id="address-input" placeholder="- - - -">
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="postal_code-input">کد پستی</label>
                        <input type="text" class="form-control number-only" id="postal_code-input" placeholder="- - - -">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="bank_account_number-input">شماره حساب بانکی</label>
                        <input type="text" class="form-control number-only" id="bank_account_number-input" placeholder="- - - -">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="major-input">رشته تحصیلی</label>
                        <input type="text" class="form-control" id="major-input" placeholder="- - - -">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="educational_level-input">مقطع تحصیلی</label>
                        <input type="text" class="form-control" id="educational_level-input" placeholder="- - - -">
                      </div>
                    </div>
                  </div>
                </div>
                <div>(قابلیت ادیت پروفایل قبل ساخت هم وجود دارد.)</div>
              </form>
                `
let profile_disabled_html_body =  `
              <form role="form">
                <div class="card-body" id="profile-card-body">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="first_name-input">نام</label>
                        <input type="text" class="form-control" id="first_name-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="last_name-input">نام خانوادگی</label>
                        <input type="text" class="form-control" id="last_name-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <div class="form-group">
                        <label for="national_ID-input">کد ملی</label>
                        <input type="text" class="form-control number-only" id="national_ID-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                    <div class="col-7">
                      <div class="form-group">
                        <label for="email-input">ایمیل</label>
                        <input type="email" class="form-control number-only" id="email-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="mobile_phone_number-input">شماره همراه</label>
                        <input type="text" class="form-control number-only" id="mobile_phone_number-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="landline_phone_number-input">شماره ثابت</label>
                        <input type="text" class="form-control number-only" id="landline_phone_number-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="address-input">آدرس</label>
                    <input type="email" class="form-control" id="address-input" placeholder="- - - -" disabled>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="postal_code-input">کد پستی</label>
                        <input type="text" class="form-control number-only" id="postal_code-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="bank_account_number-input">شماره حساب بانکی</label>
                        <input type="text" class="form-control number-only" id="bank_account_number-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label for="major-input">رشته تحصیلی</label>
                        <input type="text" class="form-control" id="major-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="educational_level-input">مقطع تحصیلی</label>
                        <input type="text" class="form-control" id="educational_level-input" placeholder="- - - -" disabled>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
                `
let password_html_body =  `
              <form role="form">
                <div class="card-body" id="userpass-card-body">
                  <div class="form-group">
                    <label for="username-input">نام کاربری</label>
                    <input type="text" class="form-control" id="username-input" placeholder="- - - -">
                  </div>
                  <div class="form-group">
                    <label for="password-input">رمز عبور</label>
                    <input type="text" class="form-control" id="password-input" placeholder="- - - -">
                  </div>
                </div>
                <div>(به صورت خودکار، نام کاربری همان شماره همراه، و رمز عبور همان کدملی کاربر ست شده است.)</div>
              </form>
              <hr>
              ${profile_disabled_html_body}
`
let insurance_html_body =  `
              <form role="form">
                <div class="card-body" id="insurance-card-body">
                  <div class="row d-flex flex-row align-items-center justify-content-around">
                    <div class="col-5">
                      <div class="form-group">
                        <label for="has_insurance-input">بیمه</label>
                        <select class="form-control" id="has_insurance-input">
                          <option value=true>دارد</option>
                          <option value=false>ندارد</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="form-group">
                        <label for="has_complementary_insurance-input">بیمه تکمیلی</label>
                        <select class="form-control" id="has_complementary_insurance-input">
                          <option value=true>دارد</option>
                          <option value=false>ندارد</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row d-flex flex-row align-items-center justify-content-around">
                    <div class="col-5">
                      <div class="form-group">
                        <label for="complementary_insurance_fee-input">هزینه بیمه تکمیلی</label>
                        <input type="text" class="form-control" id="complementary_insurance_fee-input" placeholder="- - - -">
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="form-group">
                        <label for="family_members_under_insurance-input">تعداد اعضای خانواده تحت پوشش بیمه</label>
                        <input type="text" class="form-control" id="family_members_under_insurance-input" placeholder="- - - -">
                      </div>
                    </div>
                  </div>
                </div>
              </form>
`

function initializeProfileDataTable(table_data) {
    let table = $('#profile-table').DataTable({
        language: {
            "lengthMenu":     "نشان دادن _MENU_ ردیف",
            "loadingRecords": "Loading...",
            "search":         "جستجو:",
            "zeroRecords":    "داده ای یافت نشد",
            "emptyTable":     "داده ای موجود نیست"
        },
        info : false,
        retrieve: true,
        data: table_data,
        columns: [
            {
                data: 'profile',
                render: function(data, type, row) {
                    return data.last_name + '-' + data.first_name;
                }
            },
            {
                data: null,
                orderable: false,
                defaultContent: '<button class="btn btn-success">مشاهده پروفایل</button>',
                targets: -1
            }
        ]
    });

    // Attach event handler to the buttons
    table.on('click', 'button', function (event) {
        let row_data = table.row(event.target.closest('tr')).data();

        Swal.fire({
            title: `پروفایل ${[row_data.profile.first_name, row_data.profile.last_name].join(' ')}`,
            html: profile_html_body,
            inputAttributes: {
                autocapitalize: "off"
            },
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "تایید پروفایل",
            denyButtonText: "رد درخواست",
            cancelButtonText: "انصراف",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            didOpen: () => {
                document.querySelectorAll('#profile-card-body input').forEach(input => {
                    let value = row_data.profile[input.id.replace('-input', '')];
                    input.value = value ? value : '';
                });
            },
            preConfirm: function () {
                let firstName = $("#first_name-input");
                let lastName = $("#last_name-input");
                let nationalId = $("#national_ID-input");
                let email = $("#email-input");
                let mobilePhoneNumber = $("#mobile_phone_number-input");
                let landlinePhoneNumber = $("#landline_phone_number-input");
                let educationalLevel = $("#educational_level-input");
                let major = $("#major-input");
                let bankAccountNumber = $("#bank_account_number-input");
                let postalCode = $("#postal_code-input");
                let address = $("#address-input");

                let profile_data = {
                    first_name: firstName.val(),
                    last_name: lastName.val(),
                    email: email.val(),
                    national_ID: nationalId.val(),
                    mobile_phone_number: mobilePhoneNumber.val(),
                    landline_phone_number: landlinePhoneNumber.val() || "",
                    educational_level: educationalLevel.val() || "",
                    major: major.val() || "",
                    bank_account_number: bankAccountNumber.val(),
                    postal_code: postalCode.val() || "",
                    address: address.val(),
                };

                return profile_data;
            }
        })
        .then((result) => {
            if (result.isConfirmed) {
                const profile_data = result.value;
                axiosAgent.put(`/retrieve/profile/${row_data.profile.national_ID}/`, profile_data)
                    .then((response) => {
                        Swal.fire({
                            title: `ساخت اکانت برای "${[profile_data.first_name, profile_data.last_name].join(' ')}"`,
                            html: password_html_body,
                            inputAttributes: {
                                autocapitalize: "off"
                            },
                            showCancelButton: true,
                            confirmButtonText: "ساخت یوزر",
                            cancelButtonText: "انصراف",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                            didOpen: () => {
                                document.querySelectorAll('#profile-card-body input').forEach(input => {
                                    let value = profile_data[input.id.replace('-input', '')];
                                    input.value = value ? value : '';
                                });
                                $("#username-input").val(profile_data.mobile_phone_number);
                                $("#password-input").val(profile_data.national_ID);
                            },
                            preConfirm: function () {
                                return [$("#username-input").val(), $("#password-input").val()];
                            }
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    let [username, password] = result.value
                                    axiosAgent.post('/create/user/', {
                                        username: username,
                                        password: password,
                                        profile: row_data.profile.id
                                    })
                                        .then((response) => {
                                            NotificationModal("success", "ساخت اکانت موفق",
                                                "حساب کاربری با موفقیت ساخته شد و نام کابری و رمز عبور برای کاربر ارسال میشود.")
                                            updateProfileDataTable()
                                            updateUserDataTable()
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            NotifyErrors(error, "خطا در ساخت حساب کاربری");
                                        });
                                }
                            })
                    })
                    .catch((error) => {
                        console.error(error);
                        NotifyErrors(error, "خطا در آپدیت پروفایل");
                    });

            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'warning',
                    title: "رد درخواست ساخت اکانت",
                    text:`آیا از حذف درخواست ساخت حساب کاربری "
                        ${[row_data.profile.first_name, row_data.profile.last_name].join(' ')}
                        " مطمئن هستید؟ (این عملیات قابل بازگشت نیست)`,
                    showCancelButton: true,
                    confirmButtonText: "تایید",
                    cancelButtonText: "انصراف",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        axiosAgent.delete(`/retrieve/profile/${row_data.profile.national_ID}/`)
                            .then((response) => {
                                NotificationModal("success", "رد درخواست موفق", "درخواست ساخت اکانت با موفقیت رد شد.")
                                updateProfileDataTable()
                            })
                            .catch((error) => {
                                console.error(error);
                                NotifyErrors(error, "خطا در ویرایش فیش های حقوقی");
                            });
                    }
                });
            }
        })
    });
}

function initializeUserDataTable(table_data) {
    let table = $('#user-table').DataTable({
        language: {
            "lengthMenu":     "نشان دادن _MENU_ ردیف",
            "loadingRecords": "Loading...",
            "search":         "جستجو:",
            "zeroRecords":    "داده ای یافت نشد",
            "emptyTable":     "داده ای موجود نیست"
        },
        info : false,
        retrieve: true,
        data: table_data,
        order: [[1, 'asc']],
        columns: [
            {
                data: 'profile',
                render: function(data, type, row) {
                    return data.last_name + '-' + data.first_name;
                }
            },
            {
                data: 'access_level',
                render: function(data, type, row) {
                    let result = `${data.access_level}`;
                    if (data.access_level === 'معاونت سرفصل')
                        result += ` - ${data.title}`
                    else if (data.access_level === 'مسئول واحد')
                        result += ` - ${data.branch}`

                    return result
                }
            },
            { data: 'national_ID' },
            { data: 'phone_number' },
            {
                data: null,
                orderable: false,
                defaultContent: '<button class="btn btn-success profile-btn">پروفایل</button>',
                targets: -1
            },
            {
                data: null,
                orderable: false,
                defaultContent: '<button class="btn btn-primary insurance-btn">مشخصات بیمه</button>',
                targets: -1
            }
        ]
    });

    // event handler to the profile buttons
    table.on('click', '.profile-btn', function (event) {
        let row_data = table.row($(this).closest('tr')).data();
        let name = [row_data.profile.first_name, row_data.profile.last_name].join(' ')

        Swal.fire({
            title: `پروفایل ${name}`,
            html: profile_disabled_html_body,
            inputAttributes: {
                autocapitalize: "off"
            },
            confirmButtonText: "بستن",
            didOpen: () => {
                document.querySelectorAll('#profile-card-body input').forEach(input => {
                    let value = row_data.profile[input.id.replace('-input', '')];
                    input.value = value ? value : '';
                });
            }
        })
    });

    // event handler to the insurance buttons
    table.on('click', '.insurance-btn', function (event) {
        let row_data = table.row($(this).closest('tr')).data();
        let name = [row_data.profile.first_name, row_data.profile.last_name].join(' ')

        Swal.fire({
            title: `مشخصات بیمه ${name}`,
            html: insurance_html_body,
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "ویرایش",
            cancelButtonText: "انصراف",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3741",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            didOpen: () => {
                document.querySelectorAll('#insurance-card-body input').forEach(input => {
                    let value = row_data.profile.insurance_details[input.id.replace('-input', '')];
                    input.value = value ? value : '';
                });
                document.querySelectorAll('#insurance-card-body select').forEach(input => {
                    input.value = row_data.profile.insurance_details[input.id.replace('-input', '')];
                });
            },
            preConfirm: function () {
                let has_insurance = $("#has_insurance-input").val()
                let has_complementary_insurance = $("#has_complementary_insurance-input").val()
                let complementary_insurance_fee = $("#complementary_insurance_fee-input").val()
                let family_members_under_insurance = $("#family_members_under_insurance-input").val()

                let insurance_data = {
                    has_insurance: has_insurance === "true",
                    has_complementary_insurance: has_complementary_insurance === "true",
                    complementary_insurance_fee: complementary_insurance_fee ? complementary_insurance_fee : 0,
                    family_members_under_insurance: family_members_under_insurance ? family_members_under_insurance : 0
                };

                return insurance_data;
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const insurance_data = result.value;
                    axiosAgent.put(`/insurance/edit/${row_data.national_ID}/`, insurance_data)
                        .then((response) => {
                            NotificationModal("success", `مشخصات بیمه ${name}`, 'ویرایش مشخاصت بیمه با موفقیت صورت گرفت.')
                            updateUserDataTable()
                        })
                        .catch((error) => {
                            console.error(error);
                            NotifyErrors(error, "خطا در ویرایش مشخصات بیمه");
                        });

                }
            })
    });
}

function updateProfileDataTable() {
    axiosAgent.get(`/list/profile/`)
        .then((response) => {
            let data = response.data.map(profile => ({
                "profile": profile
            }));
            updateDataTable(data, "#profile-table")
        })
        .catch((error) => {
            console.error(error);
            NotifyErrors(error, "خطا در واکشی پروفایل ها");
        });
}

function updateUserDataTable() {
    axiosAgent.get(`/list/user/all/`)
        .then((response) => {
            let data = response.data.map(profile => ({
                "profile": profile,
                "access_level": profile.access_level_data,
                "national_ID": profile.national_ID,
                "phone_number": profile.mobile_phone_number
            }));
            updateDataTable(data, "#user-table")
        })
        .catch((error) => {
            console.error(error);
            NotifyErrors(error, "خطا در واکشی یوزر ها");
        });
}

function updateDataTable(newData, tableID) {
    let table = $(tableID).DataTable();
    table.clear();
    table.rows.add(newData);
    table.draw();
}

function initializeTables() {
    $("#loadingOverlay").show()

    axiosAgent.get(`/list/profile/`)
        .then((response) => {
            let data = response.data.map(profile => ({
                "profile": profile
            }));
            initializeProfileDataTable(data)
            if (overlay_counter === 1)
                $("#loadingOverlay").hide()
            else
                overlay_counter += 1
        })
        .catch((error) => {
            console.error(error);
            $("#loadingOverlay").hide()
            NotifyErrors(error, "خطا در واکشی پروفایل ها");
        });

    axiosAgent.get('/list/user/all/')
        .then((response) => {
            let data = response.data.map(profile => ({
                "profile": profile,
                "access_level": profile.access_level_data,
                "national_ID": profile.national_ID,
                "phone_number": profile.mobile_phone_number
            }));
            initializeUserDataTable(data)
            if (overlay_counter === 1)
                $("#loadingOverlay").hide()
            else
                overlay_counter += 1
        })
        .catch((error) => {
            console.error(error);
            $("#loadingOverlay").hide()
            NotifyErrors(error, "خطا در واکشی کاربران");
        });
}


CreateNavSide("users.html")

$(document).ready(() => {
    initializeTables();
});
