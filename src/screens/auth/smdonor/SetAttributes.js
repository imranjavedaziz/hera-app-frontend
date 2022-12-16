// SetAttributes
import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smSetAttributesSchema} from '../../../constants/schemas';
import Dropdown from '../../../components/inputs/Dropdown';
const SetAttributes = ({route}) => {
  const EditAttributes = route.params?.EditAttributes;
  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smSetAttributesSchema),
  });
  return (
    <>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={globalStyle.screenTitle}>
              {EditAttributes === true
                ? Strings.sm_set_attributes.EditTitle
                : Strings.sm_set_attributes.Title}
            </Text>
            <Text style={[globalStyle.screenSubTitle]}>
              {Strings.sm_set_attributes.Subtitle}
            </Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  defaultValue={value}
                  label={Strings.sm_set_attributes.FatheEthnicity}
                  onSelect={selectedItem => {
                    onChange(selectedItem.id);
                  }}
                  required={true}
                  error={errors && errors.father_ethnicity_id?.message}
                />
              )}
              name="father_ethnicity_id"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  defaultValue={value}
                  label={Strings.sm_set_attributes.EyeColor}
                  onSelect={selectedItem => {
                    onChange(selectedItem.id);
                  }}
                  required={true}
                  error={errors && errors.eye_colour_id?.message}
                />
              )}
              name="eye_colour_id"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default React.memo(SetAttributes);
