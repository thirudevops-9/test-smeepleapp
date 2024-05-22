enum Gender {
  Male = 'Male',
  Female = 'Female',
  PreferNotToSay = 'PreferNotToSay',
}

export const getGenderDisplayName = (gender?: Gender | null) =>
  gender === Gender.PreferNotToSay ? null : gender?.toString() || '';

export default Gender;
