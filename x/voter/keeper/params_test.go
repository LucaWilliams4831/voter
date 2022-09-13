package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "voter/testutil/keeper"
	"voter/x/voter/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.VoterKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
