import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator, Dialog, Portal, PaperProvider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { convert } from '../../api/convert';
import { postFile } from '../../api/files';
import { globalStyles, white, quickSilver, midnightGreen } from '../../constants/Styles';

const ConfirmDocumentDetails = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { fileType, remotePath } = route.params;

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [loading, setLoading] = useState(false);

  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");

  const [payerName, setPayerName] = useState("");
  const [payerStreet, setPayerStreet] = useState("");
  const [payerCity, setPayerCity] = useState("");
  const [payerState, setPayerState] = useState("");
  const [payerZipCode, setPayerZipCode] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [payerEmail, setPayerEmail] = useState("");

  const [providerName, setProviderName] = useState("");
  const [providerStreet, setProviderStreet] = useState("");
  const [providerCity, setProviderCity] = useState("");
  const [providerState, setProviderState] = useState("");
  const [providerZipCode, setProviderZipCode] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [providerEmail, setProviderEmail] = useState("");

  const [insuranceSubscriberId, setInsuranceSubscriberId] = useState("");
  const [insuranceGroupId, setInsuranceGroupId] = useState("");
  const [insuranceCoverage, setInsuranceCoverage] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [insuranceEffectiveDate, setInsuranceEffectiveDate] = useState("");

  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoicePaidAmount, setInvoicePaidAmount] = useState("");
  const [invoiceAllowedAmount, setInvoiceAllowedAmount] = useState("");
  const [invoiceChargeAmount, setInvoiceChargeAmount] = useState("");

  const [claimId, setClaimId] = useState("");
  const [claimIssueDate, setClaimIssueDate] = useState("");
  const [claimPaidAmount, setClaimPaidAmount] = useState("");
  const [claimAllowedAmount, setClaimAllowedAmount] = useState("");
  const [claimChargeAmount, setClaimChargeAmount] = useState("");

  const fetchFileDetails = async (fileType, remotePath) => {
    setLoading(true);

    try {
      const result = await convert(fileType, remotePath);

      if (result.patient) {
        setPatientFirstName(result.patient.patient_first_name);
        setPatientLastName(result.patient.patient_last_name);
      }

      if (result.payer) {
        setPayerName(result.payer.payer_name);
        setPayerStreet(result.payer.payer_street);
        setPayerCity(result.payer.payer_city);
        setPayerState(result.payer.payer_state);
        setPayerZipCode(result.payer.payer_zip_code);
        setPayerPhone(result.payer.payer_phone);
        setPayerEmail(result.payer.payer_email);
      }

      if (result.provider) {
        setProviderName(result.provider.provider_name);
        setProviderStreet(result.provider.provider_street);
        setProviderCity(result.provider.provider_city);
        setProviderState(result.provider.provider_state);
        setProviderZipCode(result.provider.provider_zip_code);
        setProviderPhone(result.provider.provider_phone);
        setProviderEmail(result.provider.provider_email);
      }

      if (result.insurance) {
        setInsuranceSubscriberId(result.insurance.insurance_subscriber_id);
        setInsuranceGroupId(result.insurance.insurance_group_id);
        setInsuranceCoverage(result.insurance.insurance_coverage);
        setInsurancePlan(result.insurance.insurance_plan);
        setInsuranceEffectiveDate(result.insurance.insurance_effective_date);
      }

      if (result.invoice) {
        setInvoiceId(result.invoice.invoice_id);
        setInvoiceDate(result.invoice.invoice_date);
        setInvoicePaidAmount(result.invoice.invoice_paid_amount.toString());
        setInvoiceAllowedAmount(result.invoice.invoice_allowed_amount.toString());
        setInvoiceChargeAmount(result.invoice.invoice_charge_amount.toString());
      }

      if (result.claim) {
        setClaimId(result.claim.claim_id);
        setClaimIssueDate(result.claim.claim_issue_date);
        setClaimPaidAmount(result.claim.claim_paid_amount.toString());
        setClaimAllowedAmount(result.claim.claim_allowed_amount.toString());
        setClaimChargeAmount(result.claim.claim_charge_amount.toString());
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFileDetails(fileType, remotePath);
  }, [fileType, remotePath]);

  const submit = async () => {
    Keyboard.dismiss();

    const patient = {
      firstName: patientFirstName.trim().toLowerCase(),
      lastName: patientLastName.trim().toLowerCase(),
    };

    const provider = {
      name: providerName.trim().toLowerCase(),
      address: {
        street: providerStreet.trim().toLowerCase(),
        city: providerCity.trim().toLowerCase(),
        state: providerState.trim().toLowerCase(),
        zipCode: providerZipCode.trim().toLowerCase(),
      },
      contactInfo: {
        phone: providerPhone.trim().toLowerCase(),
        email: providerEmail.trim().toLowerCase(),
      }
    };

    const payer = {
      name: payerName.trim().toLowerCase(),
      address: {
        street: payerStreet.trim().toLowerCase(),
        city: payerCity.trim().toLowerCase(),
        state: payerState.trim().toLowerCase(),
        zipCode: payerZipCode.trim().toLowerCase(),
      },
      contactInfo: {
        phone: payerPhone.trim().toLowerCase(),
        email: payerEmail.trim().toLowerCase(),
      }
    };

    const insurance = {
      subscriberId: insuranceSubscriberId.trim().toLowerCase(),
      groupId: insuranceGroupId.trim().toLowerCase(),
      coverage: insuranceCoverage.trim().toLowerCase(),
      plan: insurancePlan.trim().toLowerCase(),
      effectiveDate: insuranceEffectiveDate,
    };

    const invoice = {
      invoiceId: invoiceId.trim().toLowerCase(),
      date: invoiceDate,
      paidAmount: +invoicePaidAmount,
      allowedAmount: +invoiceAllowedAmount,
      chargeAmount: +invoiceChargeAmount,
    };

    const claim = {
      claimId: claimId.trim().toLowerCase(),
      issueDate: claimIssueDate,
      paidAmount: +claimPaidAmount,
      allowedAmount: +claimAllowedAmount,
      chargeAmount: +claimChargeAmount,
    };

    let file = null;

    if (fileType === 'InsuranceCard') {
      file = {
        fileType,
        remotePath,
        patient,
        payer,
        insurance,
      };
    } else if (fileType === 'MedicalBill') {
      file = {
        fileType,
        remotePath,
        patient,
        provider,
        invoice,
      };
    } else if (fileType === 'EOB') {
      file = {
        fileType,
        remotePath,
        patient,
        payer,
        provider,
        claim,
      };
    }

    const fileResult = await postFile(file);

    showDialog();
  }

  const confirm = () => {
    hideDialog();

    navigation.navigate('Home');
  }

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} style={[
          globalStyles.margin10,
          globalStyles.backgroundColorWhite
        ]}>
          <Dialog.Title style={[
            globalStyles.h5
          ]}>
              Success
          </Dialog.Title>
          <Dialog.Content>
            <Text style={[
              globalStyles.body
            ]}>
              {`We have successfully saved your bill / claim details. Tap Finish to return to the home screen.`}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={[
            globalStyles.alignSelfCenter
          ]}>
            <Button 
              style={[
                globalStyles.borderRadius10
              ]}
              buttonColor={midnightGreen}
              textColor={white}
              onPress={confirm}
            >
              Finish
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <KeyboardAwareScrollView contentContainerStyle={[
        loading ? globalStyles.flex1: null, globalStyles.alignItemsCenter, 
        globalStyles.justifyContentCenter, 
        globalStyles.margin10
      ]}>
        {loading && 
          <View>
            <Text style={[
              globalStyles.textAlignCenter, 
              globalStyles.h5
            ]}>
              Using AI to extract information from document...
            </Text>
            <ActivityIndicator animating={true} color='green'/>
          </View>
        }

        {!loading &&
          <View style={[
            globalStyles.margin10,
            globalStyles.width100
          ]}>

            <View style={[
              globalStyles.marginHorizontal10
            ]}>
              <Text style={[
                globalStyles.body
              ]}>
                Please confirm the following details...
              </Text>
              <Text style={[
                globalStyles.body
              ]}>
                Here are the details we extracted from the document. Please check that everything looks good.
              </Text>
            </View>

            <View style={[
              globalStyles.marginHorizontal10
            ]}>
              <Text style={[
                globalStyles.h5
              ]}>
                Patient
              </Text>

              <TextInput
                label="Patient First Name"
                value={patientFirstName}
                onChangeText={text => setPatientFirstName(text)}
                mode="outlined"
                activeOutlineColor={quickSilver}
                textColor={midnightGreen}
                style={[
                  globalStyles.margin5,
                  globalStyles.backgroundColorWhite
                ]}
              />
              
              <TextInput
                label="Patient Last Name"
                value={patientLastName}
                onChangeText={text => setPatientLastName(text)}
                mode="outlined"
                activeOutlineColor={quickSilver}
                textColor={midnightGreen}
                style={[
                  globalStyles.margin5,
                  globalStyles.backgroundColorWhite
                ]}
              />
            </View>

            {(fileType === 'InsuranceCard' || fileType === 'EOB') &&
              <View style={[
                globalStyles.marginHorizontal10
              ]}>
                <Text style={[
                  globalStyles.h5
                ]}>
                  Insurance Provider
                </Text>

                <TextInput
                  label="Insurance Provider Name"
                  value={payerName}
                  onChangeText={text => setPayerName(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Provider Street"
                  value={payerStreet}
                  onChangeText={text => setPayerStreet(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Provider City"
                  value={payerCity}
                  onChangeText={text => setPayerCity(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Provider State"
                  value={payerState}
                  onChangeText={text => setPayerState(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Provider Zip Code"
                  value={payerZipCode}
                  onChangeText={text => setPayerZipCode(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Provider Phone"
                  value={payerPhone}
                  onChangeText={text => setPayerPhone(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Provider Phone"
                  value={payerEmail}
                  onChangeText={text => setPayerEmail(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />
              </View>
            }

            {(fileType === 'MedicalBill' || fileType === 'EOB') &&
              <View style={[
                globalStyles.marginHorizontal10
              ]}>
                <Text style={[
                  globalStyles.h5
                ]}>
                  Healthcare Provider
                </Text>

                <TextInput
                  label="Healthcare Provider Name"
                  value={providerName}
                  onChangeText={text => setProviderName(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Healthcare Provider Street"
                  value={providerStreet}
                  onChangeText={text => setProviderStreet(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Healthcare Provider City"
                  value={providerCity}
                  onChangeText={text => setProviderCity(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Healthcare Provider State"
                  value={providerState}
                  onChangeText={text => setProviderState(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Healthcare Provider Zip Code"
                  value={providerZipCode}
                  onChangeText={text => setProviderZipCode(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Healthcare Provider Phone"
                  value={providerPhone}
                  onChangeText={text => setProviderPhone(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Healthcare Provider Email"
                  value={providerEmail}
                  onChangeText={text => setProviderEmail(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />
              </View>
            }

            {(fileType === 'InsuranceCard') &&
              <View style={[
                globalStyles.marginHorizontal10
              ]}>
                <Text style={[
                  globalStyles.h5
                ]}>
                  Insurance
                </Text>

                <TextInput
                  label="Insurance Subscriber Id"
                  value={insuranceSubscriberId}
                  onChangeText={text => setInsuranceSubscriberId(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Group Id"
                  value={insuranceGroupId}
                  onChangeText={text => setInsuranceGroupId(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Coverage"
                  value={insuranceCoverage}
                  onChangeText={text => setInsuranceCoverage(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Plan"
                  value={insurancePlan}
                  onChangeText={text => setInsurancePlan(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Insurance Effective Date"
                  value={insuranceEffectiveDate}
                  onChangeText={text => setInsuranceEffectiveDate(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />
              </View>
            }

            {(fileType === 'MedicalBill') &&
              <View style={[
                globalStyles.marginHorizontal10
              ]}>
                <Text style={[
                  globalStyles.h5
                ]}>
                  Bill
                </Text>

                <TextInput
                  label="Invoice Id"
                  value={invoiceId}
                  onChangeText={text => setInvoiceId(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Invoice Date"
                  value={invoiceDate}
                  onChangeText={text => setInvoiceDate(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Invoice Paid Amount"
                  value={invoicePaidAmount}
                  onChangeText={text => setInvoicePaidAmount(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Invoice Allowed Amount"
                  value={invoiceAllowedAmount}
                  onChangeText={text => setInvoiceAllowedAmount(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Invoice Charge Amount"
                  value={invoiceChargeAmount}
                  onChangeText={text => setInvoiceChargeAmount(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />
              </View>
            }

            {(fileType === 'EOB') &&
              <View style={[
                globalStyles.marginHorizontal10
              ]}>
                <Text style={[
                  globalStyles.h5
                ]}>
                  Claim
                </Text>

                <TextInput
                  label="Claim Id"
                  value={claimId}
                  onChangeText={text => setClaimId(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Claim Issue Date"
                  value={claimIssueDate}
                  onChangeText={text => setClaimIssueDate(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Claim Paid Amount"
                  value={claimPaidAmount}
                  onChangeText={text => setClaimPaidAmount(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Claim Allowed Amount"
                  value={claimAllowedAmount}
                  onChangeText={text => setClaimAllowedAmount(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />

                <TextInput
                  label="Claim Charge Amount"
                  value={claimChargeAmount}
                  onChangeText={text => setClaimChargeAmount(text)}
                  mode="outlined"
                  activeOutlineColor={quickSilver}
                  textColor={midnightGreen}
                  style={[
                    globalStyles.margin5,
                    globalStyles.backgroundColorWhite
                  ]}
                />
              </View>
            }
                
            <Button 
              style={[
                globalStyles.alignSelfCenter, 
                globalStyles.margin10,
                globalStyles.borderRadius10, 
              ]}
              labelStyle={[
                globalStyles.h5
              ]}
              buttonColor={midnightGreen}
              textColor={white}
              onPress={submit}
            >
              Save details
            </Button>
          </View>
        }
      </KeyboardAwareScrollView>
    </PaperProvider>
  )
}

export default ConfirmDocumentDetails;
