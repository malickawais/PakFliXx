import React from 'react';
import AccountCard from '../../components/Account/AccountCard/AccountCard';
import { NavLink } from 'react-router-dom';
import { BsHeartFill, BsPersonCircle } from 'react-icons/bs';

export default function Account() {
  return (
    <div>
      <AccountCard
        title={'Profile'}
        renderIcon={() => (
          <BsPersonCircle size={'25'} color={'black'} className='icon' />
        )}
        subTitle={'Click here to veiw or edit your profile'}
      />
      <AccountCard
        title={'Favourites'}
        renderIcon={() => (
          <BsHeartFill size={'25'} color={'black'} className='icon' />
        )}
        link={{ to: '/account/favorites' }}
        subTitle={'Click here to check your favourites'}
      />
    </div>
  );
}
