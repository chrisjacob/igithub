require 'test_helper'

class DemosControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:demos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create demo" do
    assert_difference('Demo.count') do
      post :create, :demo => { }
    end

    assert_redirected_to demo_path(assigns(:demo))
  end

  test "should show demo" do
    get :show, :id => demos(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => demos(:one).to_param
    assert_response :success
  end

  test "should update demo" do
    put :update, :id => demos(:one).to_param, :demo => { }
    assert_redirected_to demo_path(assigns(:demo))
  end

  test "should destroy demo" do
    assert_difference('Demo.count', -1) do
      delete :destroy, :id => demos(:one).to_param
    end

    assert_redirected_to demos_path
  end
end
