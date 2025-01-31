import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
 background:#8080FF;
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
