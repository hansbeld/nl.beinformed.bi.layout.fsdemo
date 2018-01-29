// @flow
import { connector } from "beinformed/containers/Form/Form";

// import { connect } from "react-redux";
// import { reloadAccount } from "fsdemo/containers/QuickTransfer/actions";
import QuickTransfer from "fsdemo/components/QuickTransfer/QuickTransfer";

// const mapStateToProps = (state: {}, ownProps: any) => ({
//   locale: state.i18n.locale,
//   ...ownProps
// });
//
// export default connect(mapStateToProps, {
//   onTransferFinished: reloadAccount
// })(QuickTransfer);

export default connector(QuickTransfer);
