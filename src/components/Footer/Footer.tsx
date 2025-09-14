import { Col, Flex, Text } from '@/components';
export default function Footer() {
  return (
    <footer
      style={{
        padding: '2rem',
        backgroundColor: '#ecedff',
        color: '#4d5192',
        display: 'flex',
        fontWeight: '500!important',
        justifyContent: 'space-between',
      }}
    >
      <Flex gap=".5rem" alignItems="center">
        <Text color="inherit">
          <b>Gypsum UI</b>
        </Text>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5101 0.902345C23.6742 -0.24171 25.3258 -0.241717 25.4899 0.902338L28.1489 19.4438C28.2117 19.8815 28.5546 20.2261 28.9921 20.291L47.3305 23.0108C48.4682 23.1796 48.4682 24.8204 47.3305 24.9892L28.9921 27.709C28.5546 27.7739 28.2117 28.1185 28.1489 28.5562L25.4899 47.0977C25.3258 48.2417 23.6742 48.2417 23.5101 47.0977L20.8511 28.5562C20.7883 28.1185 20.4454 27.7739 20.0079 27.709L1.66951 24.9892C0.531793 24.8204 0.531787 23.1796 1.66951 23.0108L20.0079 20.291C20.4454 20.2261 20.7883 19.8815 20.8511 19.4438L23.5101 0.902345Z"
            fill="currentColor"
          ></path>
        </svg>
        <Text color="inherit">
          <b>{new Date().getFullYear()}</b>
        </Text>
      </Flex>
      <Col>
        <Text color="inherit">
          <a style={{ color: 'inherit' }} href="https://t.me/vitaliy_dorokhin">
            {' '}
            @vitaliy_dorokhin
          </a>
        </Text>
        <a style={{ color: 'inherit' }} href="https://github.com/dorokhinvitaliy">
          github.com/dorokhinvitaliy
        </a>
      </Col>
    </footer>
  );
}
