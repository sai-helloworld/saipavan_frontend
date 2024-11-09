export const validateMemberId = (memberId: string): string | null => {
    if (!memberId) return 'Member ID is required';
    if (memberId.length < 5) return 'Member ID must be at least 5 characters';
    if (!/^\d+$/.test(memberId)) return 'Member ID must contain only numbers';
    return null;
  };
  
  export const validateDOB = (dob: string): string | null => {
    if (!dob) return 'Date of Birth is required';
    
    const date = new Date(dob);
    const today = new Date();
    
    if (date > today) return 'Date of Birth cannot be in the future';
    
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    if (date < minDate) return 'Please enter a valid Date of Birth';
    
    return null;
  };
  
  export const validateMobile = (mobile: string): string | null => {
    if (!mobile) return 'Mobile number is required';
    if (!/^\d{10}$/.test(mobile)) return 'Mobile number must be 10 digits';
    return null;
  };
  
  export const validateOTP = (otp: string): string | null => {
    if (!otp) return 'OTP is required';
    if (!/^\d{6}$/.test(otp)) return 'OTP must be 6 digits';
    return null;
  };