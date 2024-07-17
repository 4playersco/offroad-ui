const UserInfo = () => {
  const user = {
    accountStatus: "",
    phone: "",
  };

  return (
    <div>
      <p>
        Account status (active/past
        due/delinquent/inactive/new/removed/resigned): {user.accountStatus}
      </p>
      <p>Expires: 1/2/2019</p>
      <p>Membership activity log</p>
      <ul>
        <li>Account created - 1/1/2014</li>
        <li>Guest member to full member - 10/1/2014</li>
        <li>2014 dues paid - 10/1/2014</li>
        <li>2015 dues paid - 1/1/2015</li>
        <li>Past due - 1/1/2016</li>
        <li>Delinquent - 3/1/2016</li>
        <li>Inactive - 6/1/2016</li>
        <li>Full member to guest member - 1/1/2017</li>
        <li>Guest member to full member - 7/1/2018</li>
        <li>2018 dues paid - 7/1/2018</li>
        <li>Title added: President - 11/1/2018</li>
        <li>Title removed: President - 11/1/2018</li>
        <li>Removed from membership - 12/1/2018</li>
      </ul>

      <p>Phone: {user.phone}</p>
      <address>
        Address
        <br />
        Address
      </address>
      <p>Birthday</p>
      <p>
        Emergency Contact:
        <br />
        Name
        <br />
        Phone
        <br />
        Relation
      </p>
      <p>
        Misc Information:
        <br />
        Okay to appear in public photos?
        <br />
        Shirt size
      </p>
    </div>
  );
};

export default UserInfo;
