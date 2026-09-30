const prompt = require('prompt-sync')({ sigint: true });

let choice;
let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

let currentMemberType = "";
let isRegistered = false;
let currentYear = new Date().getFullYear().toString();

do {
    console.log("\n" + "-".repeat(50));
    console.log("=== HỆ THỐNG QUẢN LÝ HỘI VIÊN GYM ===");
    console.log("1. Đăng ký và chuẩn hóa hồ sơ hội viên mới");
    console.log("2. Tính tiền gói tập và áp dụng giảm giá");
    console.log("3. Quét mã thẻ check-in tại cửa quay");
    console.log("4. Xuất báo cáo thống kê ca trực và thoát");
    console.log("-".repeat(50));

    choice = prompt("Nhập lựa chọn của bạn (1-4): ");

    switch (choice) {
        case '1':
            let typeInput = prompt("Nhập gói tập (STANDARD hoặc VIP): ");
            currentMemberType = typeInput.trim().toUpperCase();

            if (currentMemberType === "STANDARD" || currentMemberType === "VIP") {
                isRegistered = true;
                console.log(`\n=> THÀNH CÔNG: Đã ghi nhận hồ sơ gói ${currentMemberType}.`);
            } else {
                isRegistered = false;
                console.log("\n=> LỖI: Gói tập không hợp lệ. Vui lòng nhập STANDARD hoặc VIP.");
            }
            break;

        case '2':
            if (!isRegistered) {
                console.log("\n=> LỖI: Chưa có hồ sơ đăng ký hợp lệ. Vui lòng thực hiện chức năng 1 trước.");
                break;
            }

            let monthsInput = prompt("Nhập số tháng đăng ký: ");
            let ptInput = prompt("Nhập số buổi thuê PT kèm riêng (nhập 0 nếu không thuê): ");

            let months = parseInt(monthsInput);
            let ptSessions = parseInt(ptInput);

            if (isNaN(months) || months <= 0 || isNaN(ptSessions) || ptSessions < 0) {
                console.log("\n=> LỖI: Số tháng hoặc số buổi PT không hợp lệ.");
                break;
            }

            let basePrice = currentMemberType === "VIP" ? 800000 : 500000;
            let packageCost = basePrice * months;
            let ptCost = ptSessions * 300000;
            let subTotal = packageCost + ptCost;

            let discountRate = 0;
            if (months >= 12) {
                discountRate = 0.25;
            } else if (months >= 6) {
                discountRate = 0.15;
            }

            let discountAmount = subTotal * discountRate;
            let finalTotal = subTotal - discountAmount;

            totalRevenue += finalTotal;
            registeredMembers++;
            isRegistered = false;

            console.log("\n" + "-".repeat(45));
            console.log("HÓA ĐƠN ĐĂNG KÝ HỘI VIÊN".padStart(34));
            console.log("-".repeat(45));
            console.log(`Gói tập: ${currentMemberType.padStart(34)}`);
            console.log(`Số tháng: ${String(months).padStart(33)}`);
            console.log(`Tiền gói tập: ${String(packageCost).padStart(25)} VNĐ`);
            console.log(`Tiền thuê PT: ${String(ptCost).padStart(25)} VNĐ`);
            console.log("-".repeat(45));
            console.log(`TỔNG TẠM TÍNH: ${String(subTotal).padStart(24)} VNĐ`);

            if (discountRate > 0) {
                console.log(`CHIẾT KHẤU (${discountRate * 100}%): -${String(discountAmount).padStart(19)} VNĐ`);
            }

            console.log(`THÀNH TIỀN: ${String(finalTotal).padStart(28)} VNĐ`);
            console.log("-".repeat(45));
            break;

        case '3':
            let cardCode = prompt(`Nhập mã thẻ check-in (VD: GYM-VIP-${currentYear}): `);
            cardCode = cardCode.trim().toUpperCase();

            if (cardCode.startsWith("GYM-") && cardCode.endsWith(currentYear)) {
                checkInCount++;
                console.log("\n=> CHECK-IN THÀNH CÔNG: Chào mừng hội viên!");
            } else {
                console.log(`\n=> LỖI: Mã thẻ không hợp lệ. Cần bắt đầu bằng "GYM-" và kết thúc bằng "${currentYear}".`);
            }
            break;

        case '4':
            console.log("\n" + "=".repeat(45));
            console.log("BÁO CÁO TỔNG KẾT CA TRỰC".padStart(34));
            console.log("=".repeat(45));
            console.log(`Số hội viên đăng mới: ${String(registeredMembers).padStart(21)}`);
            console.log(`Lượt check-in thành công: ${String(checkInCount).padStart(17)}`);
            console.log(`TỔNG DOANH THU: ${String(totalRevenue).padStart(23)} VNĐ`);
            console.log("=".repeat(45));
            console.log("=> Đã kết thúc ca trực. Hẹn gặp lại!");
            break;

        default:
            console.log("\n=> LỖI: Lựa chọn không hợp lệ. Vui lòng chọn 1-4.");
            break;
    }
} while (choice !== '4');