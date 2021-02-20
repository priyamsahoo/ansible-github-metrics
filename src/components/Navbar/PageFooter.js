import Icon, { UpCircleOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import logo from "../../assets/image.png";

const PageFooter = () => {
  return (
    <div>
      <img src={logo} width="50" height="50"></img>
      <p> Networks Collection Metrics</p>
      <div className="copyright">Copyright &copy; 2021 </div>
      <BackTop></BackTop>
    </div>
  );
};

export default PageFooter;
