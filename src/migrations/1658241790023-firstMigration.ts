import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1658241790023 implements MigrationInterface {
    name = 'firstMigration1658241790023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Services" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(400) NOT NULL, "price" numeric(8,2) NOT NULL, CONSTRAINT "PK_811d1dc4e17047c8aee4454b968" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "BookingService" ("id" uuid NOT NULL, "bookingId" uuid, CONSTRAINT "PK_edca0d44b16cbe74628a582d598" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Roles" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(200) NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employees" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(200) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "hotelId" uuid, "jobTitlesId" integer, CONSTRAINT "PK_42cbd69fa6c59f000fdc0c07bb9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "RoomType" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "qtyClients" integer NOT NULL, "qtySingleBed" integer NOT NULL, "qtyDoubleBed" integer NOT NULL, CONSTRAINT "UQ_51acf471740cedf4d5989e60b76" UNIQUE ("type"), CONSTRAINT "PK_c5c7deec5a6e7669c35fd7fa571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Rooms" ("id" uuid NOT NULL, "roomNumber" integer NOT NULL, "floorNumber" integer NOT NULL, "price" numeric(8,2) NOT NULL, "isClean" boolean NOT NULL, "isAvailable" boolean NOT NULL, "hotelId" uuid, "roomTypeId" integer, CONSTRAINT "PK_f120a70aaf1cecbd6c1ac8f1c23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Hotel" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "qtyBedRooms" integer NOT NULL, "cnpj" character varying(20) NOT NULL, "address" character varying(150) NOT NULL, CONSTRAINT "PK_3cc16b686a5501a152fd177933f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Clients" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "personalId" character varying NOT NULL, "cell" character varying(11) NOT NULL, "isAlocated" boolean NOT NULL, CONSTRAINT "UQ_9a2e7db8c9141229ab8e6938f67" UNIQUE ("cell"), CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Booking" ("id" uuid NOT NULL, "checkinDate" TIMESTAMP NOT NULL DEFAULT now(), "checkoutDate" TIMESTAMP NOT NULL DEFAULT now(), "isPaid" boolean NOT NULL, "qtyClients" boolean NOT NULL, "hotelId" uuid, "clientId" uuid, "roomsId" uuid, CONSTRAINT "PK_d448e3d9fb1fb94ebd66eac73a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services_booking_service_booking_service" ("servicesId" integer NOT NULL, "bookingServiceId" uuid NOT NULL, CONSTRAINT "PK_8150226fb36d547dbbe9c391ff2" PRIMARY KEY ("servicesId", "bookingServiceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_521a9382b5d87622b511ab0fd1" ON "services_booking_service_booking_service" ("servicesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51bc7bc53766ccd4e9f51b1086" ON "services_booking_service_booking_service" ("bookingServiceId") `);
        await queryRunner.query(`CREATE TABLE "booking_service_services_services" ("bookingServiceId" uuid NOT NULL, "servicesId" integer NOT NULL, CONSTRAINT "PK_c40f1b8dfccd93dcd7e08c37a96" PRIMARY KEY ("bookingServiceId", "servicesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5932aa6789139bd8b39c9a7f2" ON "booking_service_services_services" ("bookingServiceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f6387c931b84def633cb3279b" ON "booking_service_services_services" ("servicesId") `);
        await queryRunner.query(`CREATE TABLE "booking_service_employees_employees" ("bookingServiceId" uuid NOT NULL, "employeesId" integer NOT NULL, CONSTRAINT "PK_d303abb1f7ba9e9d13d7e5bc2fd" PRIMARY KEY ("bookingServiceId", "employeesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7c1c63d59c03679e3636338448" ON "booking_service_employees_employees" ("bookingServiceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4696bddc08a0262f5bb963ef90" ON "booking_service_employees_employees" ("employeesId") `);
        await queryRunner.query(`CREATE TABLE "employees_booking_service_booking_service" ("employeesId" integer NOT NULL, "bookingServiceId" uuid NOT NULL, CONSTRAINT "PK_7140befab1c3382101ef3e8cadd" PRIMARY KEY ("employeesId", "bookingServiceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fb46db0955ba6dbe1c740cebc" ON "employees_booking_service_booking_service" ("employeesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9bab9c018f8a8d2eb42c3b4eba" ON "employees_booking_service_booking_service" ("bookingServiceId") `);
        await queryRunner.query(`ALTER TABLE "BookingService" ADD CONSTRAINT "FK_e1a4174cd42d51a546ed010a2f1" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_28c75c9925ccf6429286d212a5e" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_7600f87a4f24ff93911134b67d9" FOREIGN KEY ("jobTitlesId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Rooms" ADD CONSTRAINT "FK_b82e75789637ac95b360918bd5c" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Rooms" ADD CONSTRAINT "FK_a5ead621013fdbe71f6b92925c3" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Booking" ADD CONSTRAINT "FK_7836bc2b911e3f1d1fa36c82abd" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Booking" ADD CONSTRAINT "FK_556cbcada6395c7b9cc417c4acb" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Booking" ADD CONSTRAINT "FK_3d24724de57d396266956b0bdbc" FOREIGN KEY ("roomsId") REFERENCES "Rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services_booking_service_booking_service" ADD CONSTRAINT "FK_521a9382b5d87622b511ab0fd16" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_booking_service_booking_service" ADD CONSTRAINT "FK_51bc7bc53766ccd4e9f51b1086c" FOREIGN KEY ("bookingServiceId") REFERENCES "BookingService"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_service_services_services" ADD CONSTRAINT "FK_b5932aa6789139bd8b39c9a7f22" FOREIGN KEY ("bookingServiceId") REFERENCES "BookingService"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking_service_services_services" ADD CONSTRAINT "FK_4f6387c931b84def633cb3279bc" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_service_employees_employees" ADD CONSTRAINT "FK_7c1c63d59c03679e3636338448c" FOREIGN KEY ("bookingServiceId") REFERENCES "BookingService"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking_service_employees_employees" ADD CONSTRAINT "FK_4696bddc08a0262f5bb963ef908" FOREIGN KEY ("employeesId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees_booking_service_booking_service" ADD CONSTRAINT "FK_6fb46db0955ba6dbe1c740cebc2" FOREIGN KEY ("employeesId") REFERENCES "Employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employees_booking_service_booking_service" ADD CONSTRAINT "FK_9bab9c018f8a8d2eb42c3b4ebac" FOREIGN KEY ("bookingServiceId") REFERENCES "BookingService"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees_booking_service_booking_service" DROP CONSTRAINT "FK_9bab9c018f8a8d2eb42c3b4ebac"`);
        await queryRunner.query(`ALTER TABLE "employees_booking_service_booking_service" DROP CONSTRAINT "FK_6fb46db0955ba6dbe1c740cebc2"`);
        await queryRunner.query(`ALTER TABLE "booking_service_employees_employees" DROP CONSTRAINT "FK_4696bddc08a0262f5bb963ef908"`);
        await queryRunner.query(`ALTER TABLE "booking_service_employees_employees" DROP CONSTRAINT "FK_7c1c63d59c03679e3636338448c"`);
        await queryRunner.query(`ALTER TABLE "booking_service_services_services" DROP CONSTRAINT "FK_4f6387c931b84def633cb3279bc"`);
        await queryRunner.query(`ALTER TABLE "booking_service_services_services" DROP CONSTRAINT "FK_b5932aa6789139bd8b39c9a7f22"`);
        await queryRunner.query(`ALTER TABLE "services_booking_service_booking_service" DROP CONSTRAINT "FK_51bc7bc53766ccd4e9f51b1086c"`);
        await queryRunner.query(`ALTER TABLE "services_booking_service_booking_service" DROP CONSTRAINT "FK_521a9382b5d87622b511ab0fd16"`);
        await queryRunner.query(`ALTER TABLE "Booking" DROP CONSTRAINT "FK_3d24724de57d396266956b0bdbc"`);
        await queryRunner.query(`ALTER TABLE "Booking" DROP CONSTRAINT "FK_556cbcada6395c7b9cc417c4acb"`);
        await queryRunner.query(`ALTER TABLE "Booking" DROP CONSTRAINT "FK_7836bc2b911e3f1d1fa36c82abd"`);
        await queryRunner.query(`ALTER TABLE "Rooms" DROP CONSTRAINT "FK_a5ead621013fdbe71f6b92925c3"`);
        await queryRunner.query(`ALTER TABLE "Rooms" DROP CONSTRAINT "FK_b82e75789637ac95b360918bd5c"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_7600f87a4f24ff93911134b67d9"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_28c75c9925ccf6429286d212a5e"`);
        await queryRunner.query(`ALTER TABLE "BookingService" DROP CONSTRAINT "FK_e1a4174cd42d51a546ed010a2f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bab9c018f8a8d2eb42c3b4eba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fb46db0955ba6dbe1c740cebc"`);
        await queryRunner.query(`DROP TABLE "employees_booking_service_booking_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4696bddc08a0262f5bb963ef90"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c1c63d59c03679e3636338448"`);
        await queryRunner.query(`DROP TABLE "booking_service_employees_employees"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f6387c931b84def633cb3279b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5932aa6789139bd8b39c9a7f2"`);
        await queryRunner.query(`DROP TABLE "booking_service_services_services"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51bc7bc53766ccd4e9f51b1086"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_521a9382b5d87622b511ab0fd1"`);
        await queryRunner.query(`DROP TABLE "services_booking_service_booking_service"`);
        await queryRunner.query(`DROP TABLE "Booking"`);
        await queryRunner.query(`DROP TABLE "Clients"`);
        await queryRunner.query(`DROP TABLE "Hotel"`);
        await queryRunner.query(`DROP TABLE "Rooms"`);
        await queryRunner.query(`DROP TABLE "RoomType"`);
        await queryRunner.query(`DROP TABLE "Employees"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
        await queryRunner.query(`DROP TABLE "BookingService"`);
        await queryRunner.query(`DROP TABLE "Services"`);
    }

}
