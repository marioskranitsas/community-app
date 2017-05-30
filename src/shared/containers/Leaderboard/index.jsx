/**
 * Container component for the leaderboard page
 *
 */

import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import actions from 'actions/leaderboard';
import LeaderboardTable from 'components/Leaderboard/LeaderboardTable';
import Podium from 'components/Leaderboard/Podium';
import Banner from 'components/tc-communities/Banner';
import NewsletterSignup from 'components/tc-communities/NewsletterSignup';

import style from './styles.scss';

// The container component
class LeaderboardPageContainer extends React.Component {

  componentDidMount() {
    if (!(this.props.apiUrl === this.props.loadedApiUrl || this.props.isLoadingLeaderboard)) {
      this.props.loadLeaderboard(this.props.auth, this.props.apiUrl);
    }
  }

  render() {
    return (
      <div>
        {/* For demo we hardcode banner properties so we can disable max-len linting */}
        {/* eslint-disable max-len */}
        <Banner
          title="Leaderboard"
          text="Rewards program is intended to celebrate and recognize your contribution. Rewards for project contributions are given using ‘Reward Points’. Points earned translate into badges. Quarterly rewards are given away to the toppers of all categories."
          theme={{
            container: style.bannerContainer,
            content: style.bannerContent,
            contentInner: style.bannerContentInner,
          }}
          imageSrc="/themes/wipro2/leaderboard/banner.jpg"
        />
        {/* eslint-enable max-len */}
        <div styleName="Leaderboard">
          <h2 styleName="section-title">Leaderboard</h2>
          <Podium competitors={this.props.leaderboardData.slice(0, 3)} />
          <LeaderboardTable competitors={this.props.leaderboardData.slice(3)} />
        </div>
        <NewsletterSignup
          title="Sign up for our newsletter"
          text="Don’t miss out on the latest Topcoder IOS challenges and information!"
          imageSrc="/themes/wipro2/subscribe-bg.jpg"
        />
      </div>
    );
  }
}

LeaderboardPageContainer.defaultProps = {
  leaderboardData: [],
  isLoadingLeaderboard: false,
  loadedApiUrl: null,
  // this default url is used for demo page only
  // TODO: make it null, when we don't need a demo page
  apiUrl: 'http://www.mocky.io/v2/59098e60100000b60747c10b',
  auth: null,
};

LeaderboardPageContainer.propTypes = {
  leaderboardData: PT.arrayOf(PT.shape()),
  isLoadingLeaderboard: PT.bool,
  loadLeaderboard: PT.func.isRequired,
  loadedApiUrl: PT.string,
  apiUrl: PT.string,
  auth: PT.shape(),
};

const mapStateToProps = state => ({
  leaderboardData: state.leaderboard.data || [],
  isLoadingLeaderboard: state.leaderboard.loading,
  loadedApiUrl: state.leaderboard.loadedApiUrl,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  loadLeaderboard: (auth, apiUrl) => {
    dispatch(actions.leaderboard.fetchLeaderboardInit());
    dispatch(actions.leaderboard.fetchLeaderboardDone(auth, apiUrl));
  },
});

const LeaderboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeaderboardPageContainer);

export default LeaderboardContainer;
