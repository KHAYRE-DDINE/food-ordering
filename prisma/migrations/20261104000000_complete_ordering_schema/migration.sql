-- DropForeignKey
ALTER TABLE `OrderProduct` DROP FOREIGN KEY `OrderProduct_orderId_fkey`;

-- DropIndex
DROP INDEX `OrderProduct_orderId_fkey` ON `OrderProduct`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `customerName` VARCHAR(191) NULL,
    ADD COLUMN `deliveryNotes` VARCHAR(191) NULL,
    ADD COLUMN `discountAmount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `fulfillmentMethod` ENUM('DELIVERY', 'PICKUP') NOT NULL DEFAULT 'DELIVERY',
    ADD COLUMN `fulfillmentStatus` ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `orderNumber` INTEGER NULL,
    ADD COLUMN `paymentMethod` ENUM('CASH_ON_DELIVERY', 'CASH_ON_PICKUP', 'ONLINE') NOT NULL DEFAULT 'CASH_ON_DELIVERY',
    ADD COLUMN `paymentStatus` ENUM('UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'UNPAID',
    ADD COLUMN `promoCode` VARCHAR(191) NULL,
    ADD COLUMN `trackingToken` VARCHAR(191) NULL;

-- Give pre-existing orders unique tracking tokens before enforcing the new constraint.
UPDATE `Order` SET `trackingToken` = UUID() WHERE `trackingToken` IS NULL;
ALTER TABLE `Order` MODIFY `trackingToken` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OrderProduct` ADD COLUMN `extraNames` VARCHAR(191) NULL,
    ADD COLUMN `productName` VARCHAR(191) NULL,
    ADD COLUMN `sizeName` VARCHAR(191) NULL,
    ADD COLUMN `unitPrice` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` TEXT NOT NULL,
    MODIFY `image` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN', 'STAFF', 'KITCHEN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `OrderStatusEvent` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `fromStatus` ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED', 'REJECTED') NULL,
    `toStatus` ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED', 'REJECTED') NOT NULL,
    `note` VARCHAR(191) NULL,
    `actor` VARCHAR(191) NULL DEFAULT 'SYSTEM',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `OrderStatusEvent_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantSettings` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `name` VARCHAR(191) NOT NULL DEFAULT 'Our Restaurant',
    `phone` VARCHAR(191) NOT NULL DEFAULT '+1 555-0199',
    `email` VARCHAR(191) NOT NULL DEFAULT 'contact@restaurant.com',
    `address` VARCHAR(191) NOT NULL DEFAULT '123 Food Street',
    `deliveryFee` DOUBLE NOT NULL DEFAULT 5.0,
    `minOrderAmount` DOUBLE NOT NULL DEFAULT 10.0,
    `freeDeliveryThreshold` DOUBLE NOT NULL DEFAULT 35.0,
    `estimatedDeliveryMinutes` INTEGER NOT NULL DEFAULT 35,
    `estimatedPickupMinutes` INTEGER NOT NULL DEFAULT 15,
    `openingHour` VARCHAR(191) NOT NULL DEFAULT '10:00',
    `closingHour` VARCHAR(191) NOT NULL DEFAULT '23:00',
    `operatingDays` VARCHAR(191) NOT NULL DEFAULT 'Monday - Sunday',
    `isOpen` BOOLEAN NOT NULL DEFAULT true,
    `deliveryEnabled` BOOLEAN NOT NULL DEFAULT true,
    `pickupEnabled` BOOLEAN NOT NULL DEFAULT true,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PromoCode` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `discountType` ENUM('PERCENTAGE', 'FIXED') NOT NULL DEFAULT 'PERCENTAGE',
    `discountValue` DOUBLE NOT NULL,
    `minOrderAmount` DOUBLE NOT NULL DEFAULT 0,
    `maxDiscount` DOUBLE NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `startsAt` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,
    `usageLimit` INTEGER NULL,
    `timesUsed` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PromoCode_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `badge` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `originalPrice` DOUBLE NULL,
    `image` TEXT NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `terms` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Favorite_userId_productId_key`(`userId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerAddress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL DEFAULT 'Home',
    `streetAddress` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Order_orderNumber_key` ON `Order`(`orderNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Order_trackingToken_key` ON `Order`(`trackingToken`);

-- CreateIndex
CREATE INDEX `Order_trackingToken_idx` ON `Order`(`trackingToken`);

-- CreateIndex
CREATE INDEX `Order_userEmail_idx` ON `Order`(`userEmail`);

-- CreateIndex
CREATE INDEX `Order_fulfillmentStatus_idx` ON `Order`(`fulfillmentStatus`);

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderStatusEvent` ADD CONSTRAINT `OrderStatusEvent_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerAddress` ADD CONSTRAINT `CustomerAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
