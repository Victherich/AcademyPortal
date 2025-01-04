import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
 background:rgba(255,0,43,0.5);
  color: white;
  text-align: center;
  padding: 20px;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer id="contact">
      <FooterText>© 2024 Ephad Academy. All Rights Reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
