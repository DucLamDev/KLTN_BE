import admin from "firebase-admin";
// import serviceAccount from "./firebaseAdminSDK.json";
const firebaseAdminSDK = {
  type: "service_account",
  project_id: "clinic-management-79673",
  private_key_id: "b00711406796073970d1a0417f039b0042df2892",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0u07mMFBG9z7/\nvi0ok4qTKmQt8waNALboPj7Q/W5WtGVPwoBCwpwb3qtELT65dRSCjIXzVrUtLkRp\n8qTabPmbyApiffZW/spN6pk059hsEc3Zzbv1P56kvtC6J8LqM0fR3J1ednxNf6P5\nfPUzuW2hZoqnmT9wuQt52sqjuHq5l2nOnIyiPNMfz1nwbtxABnOiax59nqgSfqNL\nbXAbAJ9sRHn/k9MMjzVSj+l9jcjI0WWuhrrm+Loo8vTewg++gjC7auPabKDZlFZ5\n/28KxGgV6WTceph9oULIdx70B0Gzp17Uccle43zW+DHuaSdX2qCiHdJpvFGJpNao\naxj4i4jdAgMBAAECggEADJF4B6b1djHsdiF2B3vXJ6vLgqyDWJvjnFvzx1nQagQq\nhXTrsXjSHVgLRfb1hTUgo4F9MTJm8AjnJg0DLNNmOlCbdET5NAyM6gU1+UlkMgO8\n8ngNqZzufdttLXzlX58IUA5M/Uw1EbieIRPxA1NSTeaRHt2X3VFo/GTcMa17D1vb\nygvzqlzxh0XfQkz4OdTL/JodARRtDPue+/+L6e8vNJCH7Mxm+ippHtemAMDMqf9N\nqve7HFiuDlzLdHRf8vWJ/LbY6btiFh01V3797MoHZhPwI6iIbOVeT79U8Fk1Z2dy\nsHwZi6MQ9xXLj3oWPm9bscYBE/NPCC6IZPl7WGKCEQKBgQDbgCa5nztRamYmKYgY\nZCX9SUGWonoPfn23FiBwVwfWPhfpPzr12Y4MfzhOiMn0rPS3VPGir9HhjmuvbgMj\n3HaKCnGb7eVtKIThamA+v+QMTqfpXJXkn3TpK8KqRatN/sBgsEO7tNnAZ/IZ1d0Y\n0vsXB+Cn/4FYcI+Z0Dgd7nll2QKBgQDSyNDIEZqxBUq6ROFmNGa4uF3gUJKZkPXx\nbOiR7IWZXV9mofCt3wjzgULUpj+wyeHPunu6mhS1U2Vh2ViVP5I2ToPZGAQb0a3j\n9Z+6CVPHl8WydSeul35R92KanVS/dg4cVkvg6Ryo9j3AZb791cEAUBT0mwV4lDTb\nlXJaD3GEpQKBgCLKyVia2Lgq+U4LPzs+hJcFSZQq5NYX4q1moHWuFdvrs7aRAzN8\n7HsmnzIzlG9oCtIUcMisvcPW41LHSVAh3dg7l45zwu3ugkGIrwDDQc6BmTPwLQI0\nFD/xY8XBjUmrm6q3xcS3AdzxnPpjX8xThOE9qmp2oXX3QYvL6Vk1N6DhAoGBAM1L\nVT1nF/kNpGijKbz3kIyc1KHjF8WF0GShpCpr6PskXASD+Pv/XKJ95O9kNGglWE+P\n2241H7IzVWzl2UcTsX4/Hl9U6ruFjw2Vb0osR3MAOUbEoC+F0TxX66uXTLFlc/zZ\nd/HIWWee3SoEbu6fP+jkFmTej4ePIaQ0fDmHDRMZAoGBAI/CuSC1X5/Qq8whhJD8\n57kZJI1ZvTNgBY9TFEaS2rvOJ962zlfrq1JqYwVu4CqXwWSPRzf0ImOJ58HuppfD\nKW2ePx6QkXTK922HuTADhg/Hrq7MAFUeV3HzMDZGuYxgalWEOJsCc2zhrarHcGlv\nlDGeC0rB2ApxS10eKWUd8L3S\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-pmuc6@clinic-management-79673.iam.gserviceaccount.com",
  client_id: "100893384127697598097",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pmuc6%40clinic-management-79673.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminSDK),
});

export default admin;
// module.exports = admin;
