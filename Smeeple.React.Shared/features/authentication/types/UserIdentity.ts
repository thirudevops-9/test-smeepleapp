import type SystemRoles from './SystemRoles';

interface UserIdentity {
  username: string;
  firebaseUserId: string;
  userId?: number;
  expertId?: number;
  photoUrl: string | null;
  roles: Array<SystemRoles>;
  firstName: string;
  lastName: string;
  /** This will always have a value even if firstName and/or lastName doesn't. */
  fullName: string;
  /** This will always have a value even if firstName and/or lastName doesn't. */
  abbreviatedFullName: string;
  emailVerified?: boolean;
}

export default UserIdentity;
