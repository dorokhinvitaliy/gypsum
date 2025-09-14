import classNames from 'classnames';
import styles from './Navigation.module.scss';
import Li from './Link';
import { useLocation } from 'react-router-dom';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type SVGProps,
} from 'react';
import { Icon, Flex, Helper } from '@/components';
import CaretRightOutline from '../Icons/CaretRightOutline';
import { Col, type FlexProps } from '../Flex/Flex';
import { useClickOutside } from '../Input/useClickOutside';

const NavigationContext = createContext<{ opened: boolean }>({ opened: false });

const Aside = ({
  children,
  renderContent,
  hasToggleButton = true,
  collapsed = false,
  closeOnClickOutside = true,
  dark,
  ...props
}: {
  children: React.ReactNode;
  renderContent: React.ReactNode;
  hasToggleButton?: boolean;
  collapsed?: boolean;
  closeOnClickOutside?: boolean;
  dark?: boolean;
} & FlexProps) => {
  const [opened, setOpened] = useState(collapsed);
  useEffect(() => {
    setOpened(collapsed);
  }, [collapsed]);
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => {
    if (closeOnClickOutside) setOpened(false);
  });
  return (
    <NavigationContext
      value={{
        opened,
      }}
    >
      <div className={classNames(styles.aside_container, { dark: dark })}>
        <div ref={ref} className={classNames(styles.aside, { [styles.opened]: opened })}>
          <Col gap=".5rem" className={styles.links}>
            <Col gap=".5rem" {...props}>
              {children}
            </Col>
            {hasToggleButton && (
              <Link
                className={classNames(styles.arrowLink, { [styles.rotated]: opened })}
                icon={CaretRightOutline}
                tooltip="Раскрыть"
                onClick={() => setOpened(!opened)}
              ></Link>
            )}
          </Col>
        </div>
        <main className={styles.main}>{renderContent}</main>
      </div>
    </NavigationContext>
  );
};

const DynamicContent = ({
  children,
  icon: IconData,
  iconSize = 25,
}: {
  children?: React.ReactNode;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  iconSize?: number;
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);

  const { opened } = useContext(NavigationContext);

  useEffect(() => {
    if (opened) {
      if (textRef.current) {
        setWidth(textRef.current.scrollWidth);
      }
    } else {
      setWidth(0);
    }
  }, [opened]);
  return (
    <>
      <Icon size={iconSize} data={IconData} />
      <div ref={textRef} className={styles.linkText} style={{ width: width }}>
        {children}
      </div>
    </>
  );
};

const Link = ({
  children,
  to,
  icon,
  onClick,
  className,
  tooltip,
  ...props
}: {
  children?: React.ReactNode;
  to?: string;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  className?: string;
  tooltip?: React.ReactNode;
} & HTMLAttributes<HTMLElement>) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const { opened } = useContext(NavigationContext);

  const LinkNode = (
    <Li
      to={to}
      onClick={onClick}
      className={classNames(styles.asideLink, { [styles.isActive]: isActive }, className)}
      {...props}
    >
      <DynamicContent icon={icon}>{children}</DynamicContent>
    </Li>
  );

  return tooltip ? (
    <Helper hidden={opened} data={tooltip}>
      {LinkNode}
    </Helper>
  ) : (
    LinkNode
  );
};

Aside.Link = Link;

const Item = ({
  children,
  icon,
  iconSize,
  className,
  tooltip,
  ...props
}: {
  children: React.ReactNode;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  iconSize?: number;
  className?: string;
  tooltip?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>) => {
  const { opened } = useContext(NavigationContext);
  const itemNode = (
    <Flex alignItems="center" className={classNames(styles.asideItem, className)} {...props}>
      <DynamicContent icon={icon} iconSize={iconSize}>
        {children}
      </DynamicContent>
    </Flex>
  );
  return tooltip ? (
    <Helper hidden={opened} data={tooltip}>
      {itemNode}
    </Helper>
  ) : (
    itemNode
  );
};

Aside.Item = Item;

const Divider = ({ stroke }: { stroke?: number }) => {
  return <div className={styles.divider} style={{ height: stroke }}></div>;
};

Aside.Divider = Divider;

const Group = ({ children }: { children: React.ReactNode }) => {
  return (
    <Col gap=".5rem" className={styles.group}>
      {children}
    </Col>
  );
};

Aside.Group = Group;

export default Aside;
